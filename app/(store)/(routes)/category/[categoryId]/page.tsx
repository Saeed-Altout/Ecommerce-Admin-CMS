import { getCategoryById } from "@/data/category";
import { getSuggestProducts } from "@/data/product";

import { getColors } from "@/data/color";
import { getSizes } from "@/data/size";

import { Billboard } from "@/components/store/billboard";
import { NoResults } from "@/components/store/no-results";
import { ProductCard } from "@/components/store/product-card";

import { Filter } from "./_components/filter";
import { MobileFilters } from "./_components/mobile-filters";

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ categoryId: string }>;
  searchParams: Promise<{ colorId: string; sizeId: string }>;
}) {
  const { categoryId } = await params;
  const { colorId, sizeId } = await searchParams;

  const products = await getSuggestProducts({
    categoryId: categoryId,
    colorId: colorId,
    sizeId: sizeId,
  });

  const sizes = await getSizes();
  const colors = await getColors();
  const category = await getCategoryById(categoryId);

  return (
    <div className="py-10">
      {category?.billboard && <Billboard data={category?.billboard} />}
      <div className="px-4 pb-24 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-5 lg:gap-x-8">
          <MobileFilters sizes={sizes} colors={colors} />
          <div className="hidden lg:block">
            <Filter valueKey="sizeId" name="Sizes" data={sizes} />
            <Filter valueKey="colorId" name="Colors" data={colors} />
          </div>
          <div className="mt-6 lg:col-span-4 lg:mt-0">
            {products?.length === 0 && <NoResults />}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
              {products?.map((item) => (
                <ProductCard key={item.id} data={item} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
