import Link from "next/link";

import { format } from "date-fns";
import { PlusIcon } from "lucide-react";

import { getSizesByStoreId } from "@/data/size";
import { SizeColumn, columns } from "./_components/columns";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";
import { ApiList } from "@/components/ui/api-list";

export default async function SizesPage({
  params,
}: {
  params: Promise<{ storeId: string }>;
}) {
  const storeId = (await params).storeId;
  const sizes = await getSizesByStoreId(storeId);

  const formattedSizes: SizeColumn[] = sizes.map((billboard) => ({
    id: billboard.id,
    name: billboard.name,
    value: billboard.value,
    createdAt: format(billboard.createdAt, "PP"),
  }));

  return (
    <>
      <Heading
        title={`Sizes (${formattedSizes.length})`}
        description="Manage all your sizes from one centralized dashboard."
      >
        <Button asChild>
          <Link href={`/dashboard/${storeId}/sizes/new`}>
            <PlusIcon />
            Add New
          </Link>
        </Button>
      </Heading>
      <Separator />
      <DataTable columns={columns} data={formattedSizes} searchKey="name" />
      <Heading title="API" description="Apis calls for sizes" />
      <Separator />
      <ApiList entityName="sizes" entityIdName="sizeId" />
    </>
  );
}
