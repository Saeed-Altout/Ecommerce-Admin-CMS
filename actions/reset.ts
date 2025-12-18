"use server";

import * as z from "zod";

import { ResetSchema } from "@/schemas";
import { getUserByEmail } from "@/data/user";
import { generatePasswordResetToken } from "@/lib/tokens";
import { sendPasswordResetEmail } from "@/lib/mail";

export async function reset(values: z.infer<typeof ResetSchema>) {
  const validatedFields = ResetSchema.safeParse(values);
  if (!validatedFields.success) return { error: "Invalid fields!" };

  const { email } = validatedFields.data;
  const existingUser = await getUserByEmail(email);
  if (!existingUser) return { error: "User not found!" };

  const passwordResetToken = await generatePasswordResetToken(email);
  if (!passwordResetToken)
    return { error: "Failed to generate password reset token!" };

  await sendPasswordResetEmail(email, passwordResetToken.token);

  return { success: "Password reset email sent!" };
}
