import { redirect } from "next/navigation";

import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";

export default async function SetupLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await currentUser();
  const userId = user?.id;
  if (!userId) redirect("/auth/login");

  const store = await db.store.findFirst({ where: { userId } });
  if (store) redirect(`/dashboard/${store.id}`);

  return <>{children}</>;
}
