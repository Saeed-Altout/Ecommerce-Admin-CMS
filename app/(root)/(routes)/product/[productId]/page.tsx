import { getProduct, getSuggestProducts } from "@/data/product";

import { Gallery } from "@/components/gallery";
import { Info } from "@/components/store/info";
import { ProductList } from "@/components/store/product-list";
import { Separator } from "@/components/ui/separator";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const productId = (await params).productId;

  const product = await getProduct(productId);
  const suggestProducts = await getSuggestProducts({
    categoryId: product!.categoryId,
  });

  return (
    <div className="space-y-10 px-4 py-10 sm:px-6 lg:px-8">
      <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
        <Gallery images={product!.images} />
        <div className="mt-0 px-4 sm:mt-16 sm:px-0 lg:mt-0">
          <Info data={product!} />
        </div>
      </div>
      <Separator />
      <ProductList title="Related Items" items={suggestProducts} />
    </div>
  );
}
