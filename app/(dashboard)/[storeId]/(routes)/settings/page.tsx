import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import { db } from "@/lib/db";

import { SettingsForm } from "./_components/settings-form";

export default async function SettingsPage({
  params,
}: {
  params: Promise<{ storeId: string }>;
}) {
  const storeId = (await params).storeId;
  const user = await currentUser();

  if (!user?.id) {
    redirect("/sign-in");
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

  return <SettingsForm initialData={store} />;
}
