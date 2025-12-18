import { currentUser } from "@/lib/auth";
import { redirect } from "next/navigation";

import { db } from "@/lib/db";

import { ColorForm } from "./_components/color-form";

export default async function ColorPage({
  params,
}: {
  params: Promise<{ colorId: string }>;
}) {
  const colorId = (await params).colorId;
  const user = await currentUser();

  if (!user?.id) {
    redirect("/sign-in");
  }

  const color = await db.color.findUnique({
    where: {
      id: colorId,
    },
  });

  return <ColorForm initialData={color} />;
}
