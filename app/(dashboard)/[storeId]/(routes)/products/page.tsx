import { format } from "date-fns";

import { db } from "@/lib/db";
import { formatPrice } from "@/lib/utils";

import { ProductsClient } from "./_components/client";
import { ProductColumn } from "./_components/columns";

export default async function ProductsPage({
  params,
}: {
  params: Promise<{ storeId: string }>;
}) {
  const storeId = (await params).storeId;
  const products = await db.product.findMany({
    where: {
      storeId,
    },
    include: {
      category: true,
      size: true,
      color: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedProducts: ProductColumn[] = products.map((product) => ({
    id: product.id,
    name: product.name,
    isFeatured: product.isFeatured,
    isArchived: product.isArchived,
    price: formatPrice(+product.price),
    category: product.category.name,
    size: product.size.name,
    color: product.color.value,
    createdAt: format(product.createdAt, "PPP"),
  }));

  return <ProductsClient data={formattedProducts} />;
}
