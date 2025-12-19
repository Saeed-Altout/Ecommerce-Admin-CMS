import { format } from "date-fns";

import { db } from "@/lib/db";

import { ColorsClient } from "./_components/client";
import { ColorColumn } from "./_components/columns";

export default async function ColorsPage({
  params,
}: {
  params: Promise<{ storeId: string }>;
}) {
  const storeId = (await params).storeId;
  const colors = await db.color.findMany({
    where: {
      storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedColors: ColorColumn[] = colors.map((color) => ({
    id: color.id,
    name: color.name,
    value: color.value,
    createdAt: format(color.createdAt, "PPP"),
  }));

  return <ColorsClient data={formattedColors} />;
}
