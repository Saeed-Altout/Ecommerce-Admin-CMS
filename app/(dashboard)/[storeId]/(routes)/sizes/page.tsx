import { format } from "date-fns";

import { db } from "@/lib/db";

import { SizesClient } from "./_components/client";
import { SizeColumn } from "./_components/columns";

export default async function SizesPage({
  params,
}: {
  params: Promise<{ storeId: string }>;
}) {
  const storeId = (await params).storeId;
  const sizes = await db.size.findMany({
    where: {
      storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedSizes: SizeColumn[] = sizes.map((billboard) => ({
    id: billboard.id,
    name: billboard.name,
    value: billboard.value,
    createdAt: format(billboard.createdAt, "PPP"),
  }));

  return <SizesClient data={formattedSizes} />;
}
