import { getProducts } from "@/data/product";
import { getBillboardById } from "@/data/billboard";

import { Billboard } from "@/components/store/billboard";
import { ProductList } from "@/components/store/product-list";

export default async function HomePage() {
  const billboard = await getBillboardById(
    process.env.NEXT_PUBLIC_BILLBOARD_ID!,
  );
  const products = await getProducts();

  return (
    <div className="space-y-10 pb-10">
      <Billboard data={billboard!} />
      <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
        <ProductList title="Featured Products" items={products} />
      </div>
    </div>
  );
}
