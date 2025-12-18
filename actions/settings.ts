"use server";

import * as z from "zod";
import bcryptjs from "bcryptjs";

import { settingsSchema } from "@/schemas";
import { getUserByEmail, getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { sendVerificationEmail } from "@/lib/mail";
import { generateVerificationToken } from "@/lib/tokens";

export async function settings(values: z.infer<typeof settingsSchema>) {
  const user = await currentUser();
  if (!user) return { error: "Unauthorized!" };

  const validatedFields = settingsSchema.safeParse(values);
  if (!validatedFields.success) return { error: "Invalid fields!" };

  const { name, isTwoFactorEnabled, role, email, password, newPassword } =
    validatedFields.data;

  const dbUser = await getUserById(user.id);
  if (!dbUser) return { error: "User not found!" };

  if (password && dbUser.password && newPassword) {
    const passwordMatch = await bcryptjs.compare(password, dbUser.password);
    if (!passwordMatch) return { error: "Invalid password!" };

    const hashedPassword = await bcryptjs.hash(newPassword, 10);

    values.password = hashedPassword;
    values.newPassword = undefined;
    values.confirmNewPassword = undefined;
  }

  if (email && email !== user.email) {
    const existingUser = await getUserByEmail(email);
    if (existingUser && existingUser.id !== user.id)
      return { error: "Email already exists!" };

    const verificationToken = await generateVerificationToken(email);
    if (!verificationToken)
      return { error: "Failed to generate verification token!" };

    await sendVerificationEmail(email, verificationToken.token);

    return {
      success: "Verification email sent! Please check your email.",
    };
  }

  if (user.isOAuth) {
    values.email = undefined;
    values.password = undefined;
    values.isTwoFactorEnabled = undefined;
  }

  await db.user.update({
    where: { id: dbUser.id },
    data: { name, isTwoFactorEnabled, role, email, password },
  });

  return { success: "Settings updated successfully!" };
}
