import { CategoryForm } from "./_components/category-form";

import { getCategoryById } from "@/data/category";
import { getBillboardsByStoreId } from "@/data/billboard";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ categoryId: string; storeId: string }>;
}) {
  const categoryId = (await params).categoryId;
  const storeId = (await params).storeId;

  const category = await getCategoryById(categoryId);
  const billboards = await getBillboardsByStoreId(storeId);

  return <CategoryForm initialData={category} billboards={billboards} />;
}
