import { redirect } from "next/navigation";
import { currentUser } from "@/lib/auth";

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
    redirect("/auth/login");
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
      <main className="flex-col">
        <div className="flex-1 space-y-4 p-4 pt-4">{children}</div>
      </main>
    </>
  );
}
