import { redirect } from "next/navigation";
import { db } from "@/lib/db";

import { SettingsForm } from "./_components/settings-form";

export default async function SettingsPage({
  params,
}: {
  params: Promise<{ storeId: string }>;
}) {
  const storeId = (await params).storeId;
  const store = await db.store.findFirst({ where: { id: storeId } });

  if (!store) {
    redirect("/");
  }

  return <SettingsForm initialData={store} />;
}
