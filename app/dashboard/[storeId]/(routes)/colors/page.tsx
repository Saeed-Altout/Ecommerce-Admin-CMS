import Link from "next/link";

import { format } from "date-fns";
import { PlusIcon } from "lucide-react";

import { getColorsByStoreId } from "@/data/color";
import { ColorColumn, columns } from "./_components/columns";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";
import { ApiList } from "@/components/ui/api-list";

export default async function ColorsPage({
  params,
}: {
  params: Promise<{ storeId: string }>;
}) {
  const storeId = (await params).storeId;
  const colors = await getColorsByStoreId(storeId);

  const formattedColors: ColorColumn[] = colors.map((color) => ({
    id: color.id,
    name: color.name,
    value: color.value,
    createdAt: format(color.createdAt, "PP"),
  }));

  return (
    <>
      <Heading
        title={`Colors (${formattedColors.length})`}
        description="Manage all your colors from one centralized dashboard."
      >
        <Button asChild>
          <Link href={`/dashboard/${storeId}/colors/new`}>
            <PlusIcon className="size-4" />
            Add New
          </Link>
        </Button>
      </Heading>
      <Separator />
      <DataTable columns={columns} data={formattedColors} searchKey="name" />
      <Heading title="API" description="Apis calls for colors" />
      <Separator />
      <ApiList entityName="colors" entityIdName="colorId" />
    </>
  );
}
