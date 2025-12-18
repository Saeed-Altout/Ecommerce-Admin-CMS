import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmationLink = `${process.env.NEXT_PUBLIC_APP_URL}/auth/new-verification?token=${token}`;

  await resend.emails.send({
    from: "NexAuth <onboarding@resend.dev>",
    to: email,
    subject: "Confirm your email",
    html: `<p>Confirm your email by clicking <a href="${confirmationLink}">here</a></p>`,
  });
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `${process.env.NEXT_PUBLIC_APP_URL}/auth/new-password?token=${token}`;

  await resend.emails.send({
    from: "NexAuth <onboarding@resend.dev>",
    to: email,
    subject: "Reset your password",
    html: `<p>Reset your password by clicking <a href="${resetLink}">here</a></p>`,
  });
};

export const sendTwoFactorTokenEmail = async (email: string, token: string) => {
  await resend.emails.send({
    from: "NexAuth <onboarding@resend.dev>",
    to: email,
    subject: "Confirm your two factor token",
    html: `<p>Your two factor token: <strong>${token}</strong></p>`,
  });
};
