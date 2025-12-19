import { BillboardForm } from "./_components/billboard-form";

import { getBillboardById } from "@/data/billboard";

export default async function BillboardsPage({
  params,
}: {
  params: Promise<{ billboardId: string }>;
}) {
  const billboardId = (await params).billboardId;
  const billboard = await getBillboardById(billboardId);

  return <BillboardForm initialData={billboard} />;
}
