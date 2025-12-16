import { format } from "date-fns";

import { db } from "@/lib/db";

import { BillboardsClient } from "./_components/client";
import { BillboardColumn } from "./_components/columns";

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

  const formattedBillboards: BillboardColumn[] = billboards.map(
    (billboard) => ({
      id: billboard.id,
      label: billboard.label,
      createdAt: format(billboard.createdAt, "PPP"),
    }),
  );

  return <BillboardsClient data={formattedBillboards} />;
}
