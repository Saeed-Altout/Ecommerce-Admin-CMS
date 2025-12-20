import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

import { SessionProvider } from "next-auth/react";

// import { ClerkProvider } from "@clerk/nextjs";
import { ModalProvider } from "@/providers/modal-provider";
import { Toaster } from "@/components/ui/sonner";
import { auth } from "@/auth";
import QueryProviders from "@/providers/query-provider";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Vendo",
  description: "Multi-store E-commerce Admin Dashboard and Storefront",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <SessionProvider session={session}>
      <QueryProviders>
        <html lang="en">
          <body className={`${poppins.className} antialiased`}>
            <ModalProvider />
            <Toaster />
            {children}
          </body>
        </html>
      </QueryProviders>
    </SessionProvider>
  );
}
