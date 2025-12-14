import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";

import { db } from "@/lib/db";
import { Navbar } from "@/components/navbar";

export default async function StoreLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ storeId: string }>;
}>) {
  const storeId = (await params).storeId;
  const user = await currentUser();

  if (!user?.id) {
    redirect("/sign-in");
  }

  if (!storeId) {
    redirect("/");
  }

  const store = await db.store.findFirst({
    where: {
      id: storeId,
      userId: user?.id,
    },
  });

  if (!store) {
    redirect("/");
  }

  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
