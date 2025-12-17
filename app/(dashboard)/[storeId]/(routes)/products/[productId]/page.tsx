import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import { db } from "@/lib/db";

import { ProductForm } from "./_components/product-form";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ productId: string; storeId: string }>;
}) {
  const productId = (await params).productId;
  const storeId = (await params).storeId;

  const user = await currentUser();

  if (!user?.id) {
    redirect("/sign-in");
  }

  const product = await db.product.findUnique({
    where: {
      id: productId,
    },
    include: {
      images: true,
    },
  });

  const categories = await db.category.findMany({
    where: {
      storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  const sizes = await db.size.findMany({
    where: {
      storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  const colors = await db.color.findMany({
    where: {
      storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <ProductForm
      initialData={product}
      categories={categories}
      sizes={sizes}
      colors={colors}
    />
  );
}
