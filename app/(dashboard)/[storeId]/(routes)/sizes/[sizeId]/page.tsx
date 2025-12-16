import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import { db } from "@/lib/db";

import { SizeForm } from "./_components/size-form";

export default async function sizesPage({
  params,
}: {
  params: Promise<{ sizeId: string }>;
}) {
  const sizeId = (await params).sizeId;
  const user = await currentUser();

  if (!user?.id) {
    redirect("/sign-in");
  }

  const size = await db.size.findUnique({
    where: {
      id: sizeId,
    },
  });

  return <SizeForm initialData={size} />;
}
