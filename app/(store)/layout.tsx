import type { Metadata } from "next";
import { Urbanist } from "next/font/google";

import { Footer } from "./_components/footer";
import { Navbar } from "./_components/navbar";
import { Container } from "@/components/ui/container";

const urbanist = Urbanist({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Vendo Store",
  description: "Vendo E-commerce Store",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={`${urbanist.className} antialiased`}>
      <Navbar />
      <main className="min-h-[calc(100vh-200px)]">
        <Container>{children}</Container>
      </main>
      <Footer />
    </div>
  );
}
