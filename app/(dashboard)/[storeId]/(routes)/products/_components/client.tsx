"use client";
import { PlusIcon } from "lucide-react";
import { useRouter, useParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";
import { ApiList } from "@/components/ui/api-list";

import { ProductColumn, columns } from "./columns";

export function ProductsClient({ data }: { data: ProductColumn[] }) {
  const params = useParams();
  const router = useRouter();

  return (
    <>
      <Heading
        title={`Products (${data.length})`}
        description="Manage your products"
      >
        <Button onClick={() => router.push(`/${params.storeId}/products/new`)}>
          <PlusIcon className="size-4" />
          Add New
        </Button>
      </Heading>
      <Separator />
      <DataTable columns={columns} data={data} searchKey="name" />
      <Heading title="API" description="Apis calls for Products" />
      <Separator />
      <ApiList entityName="products" entityIdName="productId" />
    </>
  );
}
