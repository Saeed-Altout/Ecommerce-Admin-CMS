"use server";

import * as z from "zod";
import { AuthError } from "next-auth";
import bcryptjs from "bcryptjs";

import { signIn } from "@/auth";
import { LoginSchema } from "@/schemas";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { getUserByEmail } from "@/data/user";
import {
  generateVerificationToken,
  generateTwoFactorToken,
} from "@/lib/tokens";
import { sendVerificationEmail, sendTwoFactorTokenEmail } from "@/lib/mail";
import { getTwoFactorTokenByEmail } from "@/data/two-factor-token";
import { db } from "@/lib/db";
import { getTwoFactorConfirmationByUserId } from "@/data/two-factor-confirmation";

export async function login(
  values: z.infer<typeof LoginSchema>,
  callbackUrl?: string,
) {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid filed!" };
  }

  const { email, password, code } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser.password || !existingUser.email) {
    return { error: "Email or password is incorrect!" };
  }

  const passwordMatch = await bcryptjs.compare(password, existingUser.password);
  if (!passwordMatch) return { error: "Invalid credentials!" };

  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(email);
    if (!verificationToken) {
      return { error: "Failed to send verification email!" };
    }
    await sendVerificationEmail(email, verificationToken.token);
    return { success: "Verification email sent!" };
  }

  if (existingUser.isTwoFactorEnabled) {
    if (code) {
      const twoFactorToken = await getTwoFactorTokenByEmail(email);
      if (!twoFactorToken) {
        return { error: "Failed to get two factor token!" };
      }
      if (twoFactorToken.token !== code) {
        return { error: "Invalid code!" };
      }

      const hasExpired = new Date(twoFactorToken.expires) < new Date();
      if (hasExpired) {
        return { error: "Two factor token has expired!" };
      }

      await db.twoFactorToken.delete({
        where: { id: twoFactorToken.id },
      });

      const existingConfirmation = await getTwoFactorConfirmationByUserId(
        existingUser.id,
      );
      if (existingConfirmation) {
        await db.twoFactorConfirmation.delete({
          where: { id: existingConfirmation.id },
        });
      }

      await db.twoFactorConfirmation.create({
        data: { userId: existingUser.id },
      });
    } else {
      const twoFactorToken = await generateTwoFactorToken(email);
      if (!twoFactorToken) {
        return { error: "Failed to generate two factor token!" };
      }
      await sendTwoFactorTokenEmail(email, twoFactorToken.token);
      return {
        success: "Two factor token sent!",
        twoFactor: true,
      };
    }
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials!" };
        default:
          return { error: "Something went wrong!" };
      }
    }
    throw error;
  }
}
