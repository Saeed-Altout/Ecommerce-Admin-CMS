import { format } from "date-fns";

import { db } from "@/lib/db";

import { CategoriesClient } from "./_components/client";
import { CategoryColumn } from "./_components/columns";

export default async function CategoriesPage({
  params,
}: {
  params: Promise<{ storeId: string }>;
}) {
  const storeId = (await params).storeId;
  const categories = await db.category.findMany({
    where: {
      storeId,
    },
    include: {
      billboard: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedCategories: CategoryColumn[] = categories.map((category) => ({
    id: category.id,
    name: category.name,
    billboardLabel: category.billboard.label,
    createdAt: format(category.createdAt, "PPP"),
  }));

  return <CategoriesClient data={formattedCategories} />;
}
