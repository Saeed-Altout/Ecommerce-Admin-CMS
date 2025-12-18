import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";

import authConfig from "@/auth.config";
import { db } from "@/lib/db";
import { getUserById } from "@/data/user";
import { getTwoFactorConfirmationByUserId } from "@/data/two-factor-confirmation";
import { getAccountByUserId } from "./data/account";

export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  events: {
    async linkAccount({ user }) {
      await db.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      });
    },
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider !== "credentials") return true;

      if (!user || !user.id) return false;
      const existingUser = await getUserById(user.id);

      if (!existingUser || !existingUser.emailVerified) return false;

      if (existingUser.isTwoFactorEnabled) {
        const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(
          existingUser.id,
        );

        if (!twoFactorConfirmation) return false;

        await db.twoFactorConfirmation.delete({
          where: { id: twoFactorConfirmation.id },
        });
      }

      return true;
    },
    async session({ token, session }) {
      if (session.user && token.sub) {
        session.user.id = token.sub;
      }

      if (session.user && token.role) {
        session.user.role = token.role;
      }

      if (session.user) {
        session.user.isTwoFactorEnabled = Boolean(token.isTwoFactorEnabled);
      }

      if (session.user && token.name) {
        session.user.name = token.name;
      }

      if (session.user && token.email) {
        session.user.email = token.email;
      }

      if (session.user && token.isOAuth) {
        session.user.isOAuth = Boolean(token.isOAuth);
      }

      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;

      const user = await getUserById(token.sub);
      if (!user) return token;

      const account = await getAccountByUserId(user.id);

      token.isOAuth = !!account;

      token.role = user.role;
      token.isTwoFactorEnabled = user.isTwoFactorEnabled;
      token.name = user.name;
      token.email = user.email;

      return token;
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
});
