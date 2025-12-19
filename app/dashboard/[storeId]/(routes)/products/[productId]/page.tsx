import { ProductForm } from "./_components/product-form";
import { getProductById } from "@/data/product";
import { getCategoriesByStoreId } from "@/data/category";
import { getSizesByStoreId } from "@/data/size";
import { getColorsByStoreId } from "@/data/color";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ productId: string; storeId: string }>;
}) {
  const productId = (await params).productId;
  const storeId = (await params).storeId;

  const product = await getProductById(productId);
  const categories = await getCategoriesByStoreId(storeId);
  const sizes = await getSizesByStoreId(storeId);
  const colors = await getColorsByStoreId(storeId);

  return (
    <ProductForm
      initialData={product}
      categories={categories}
      sizes={sizes}
      colors={colors}
    />
  );
}
