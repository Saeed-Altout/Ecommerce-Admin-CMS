import { getProduct } from "@/actions/get-product";
import { getProducts } from "@/actions/get-products";
import { Gallery } from "@/components/gallery";
import { Info } from "../../../_components/info";
import { ProductList } from "../../../_components/product-list";
import { Container } from "@/components/ui/container";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const productId = (await params).productId;

  const product = await getProduct(productId);
  const suggestProducts = await getProducts({
    categoryId: product?.category?.id,
  });

  return (
    <div className="bg-white">
      <Container>
        <div className="px-4 py-10 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
            {/* Gallery */}
            {product && <Gallery images={product.images} />}
            <div className="mt-0 px-4 sm:mt-16 sm:px-0 lg:mt-0">
              {/* Info */}
              {product && <Info data={product} />}
            </div>
          </div>
          <hr className="my-10" />
          <ProductList title="Related Items" items={suggestProducts} />
        </div>
      </Container>
    </div>
  );
}
