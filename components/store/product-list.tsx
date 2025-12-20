import { Category, Color, Image, Product, Size } from "@/lib/prisma/client";

import { NoResults } from "./no-results";
import { ProductCard } from "./product-card";
import { PreviewModal } from "./preview-modal";

export type ProductType = Product & {
  images: Image[];
  category: Category;
  size: Size;
  color: Color;
};

export function ProductList({
  title,
  items,
}: {
  title: string;
  items: ProductType[];
}) {
  return (
    <div className="space-y-4">
      <h3 className="text-3xl font-bold">{title}</h3>
      {items?.length === 0 && <NoResults />}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {items?.map((item) => (
          <div key={item.id}>
            <ProductCard key={item.id} data={item} />
          </div>
        ))}
      </div>
      <PreviewModal />
    </div>
  );
}
