import { BillboardsClient } from "./_components/client";
import { db } from "@/lib/db";

export default async function BillboardsPage({
  params,
}: {
  params: Promise<{ storeId: string }>;
}) {
  const storeId = (await params).storeId;
  const billboards = await db.billboard.findMany({
    where: {
      storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return <BillboardsClient data={billboards} />;
}
