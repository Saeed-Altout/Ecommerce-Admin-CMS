import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Auth",
  description: "Auth",
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex h-screen items-center justify-center">
      {children}
    </main>
  );
}
