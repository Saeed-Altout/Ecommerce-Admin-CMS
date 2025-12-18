import { currentUser } from "@/lib/auth";
import { redirect } from "next/navigation";

import { db } from "@/lib/db";

import { BillboardForm } from "./_components/order-form";

export default async function BillboardsPage({
  params,
}: {
  params: Promise<{ billboardId: string }>;
}) {
  const billboardId = (await params).billboardId;
  const user = await currentUser();

  if (!user?.id) {
    redirect("/sign-in");
  }

  const billboard = await db.billboard.findUnique({
    where: {
      id: billboardId,
    },
  });

  return <BillboardForm initialData={billboard} />;
}
