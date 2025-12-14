import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import { db } from "@/lib/db";

import { BillboardForm } from "./_components/billboard-form";

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

  //   if (!billboard) {
  //     redirect("/");
  //   }

  return <BillboardForm initialData={billboard} />;
}
