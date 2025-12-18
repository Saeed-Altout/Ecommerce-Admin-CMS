"use server";
import * as z from "zod";
import bcryptjs from "bcryptjs";

import { db } from "@/lib/db";
import { getPasswordResetTokenByToken } from "@/data/password-reset-token";
import { getUserByEmail } from "@/data/user";
import { NewPasswordSchema } from "@/schemas";

export async function newPassword(
  values: z.infer<typeof NewPasswordSchema>,
  token?: string,
) {
  if (!token) return { error: "Token is required!" };

  const validatedFields = NewPasswordSchema.safeParse(values);
  if (!validatedFields.success) return { error: "Invalid fields!" };

  const { password, confirmPassword } = validatedFields.data;
  if (password !== confirmPassword) return { error: "Passwords do not match!" };

  const passwordResetToken = await getPasswordResetTokenByToken(token);
  if (!passwordResetToken) return { error: "Invalid token!" };

  const hasExpired = new Date(passwordResetToken.expires) < new Date();
  if (hasExpired) return { error: "Token has expired!" };

  const user = await getUserByEmail(passwordResetToken.email);
  if (!user) return { error: "User not found!" };

  const hashedPassword = await bcryptjs.hash(password, 10);

  await db.user.update({
    where: { id: user.id },
    data: { password: hashedPassword },
  });

  await db.passwordResetToken.delete({
    where: { id: passwordResetToken.id },
  });

  return { success: "Password updated successfully!" };
}
