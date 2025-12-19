import Link from "next/link";

import { format } from "date-fns";
import { PlusIcon } from "lucide-react";

import { formatPrice } from "@/lib/utils";
import { getProductsByStoreId } from "@/data/product";
import { ProductColumn, columns } from "./_components/columns";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";
import { ApiList } from "@/components/ui/api-list";

export default async function ProductsPage({
  params,
}: {
  params: Promise<{ storeId: string }>;
}) {
  const storeId = (await params).storeId;
  const products = await getProductsByStoreId(storeId);

  const formattedProducts: ProductColumn[] = products.map((product) => ({
    id: product.id,
    name: product.name,
    isFeatured: product.isFeatured,
    isArchived: product.isArchived,
    price: formatPrice(+product.price),
    category: product.category.name,
    size: product.size.name,
    color: product.color.value,
    createdAt: format(product.createdAt, "PP"),
  }));

  return (
    <>
      <Heading
        title={`Products (${formattedProducts.length})`}
        description="Manage all your products from one centralized dashboard."
      >
        <Button asChild>
          <Link href={`/dashboard/${storeId}/products/new`}>
            <PlusIcon />
            Add New
          </Link>
        </Button>
      </Heading>
      <Separator />
      <DataTable columns={columns} data={formattedProducts} searchKey="name" />
      <Heading title="API" description="Apis calls for products" />
      <Separator />
      <ApiList entityName="products" entityIdName="productId" />
    </>
  );
}
