import Link from "next/link";

import { format } from "date-fns";
import { PlusIcon } from "lucide-react";

import { BillboardColumn, columns } from "./_components/columns";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";
import { ApiList } from "@/components/ui/api-list";
import { getBillboards } from "@/data/billboard";

export default async function BillboardsPage({
  params,
}: {
  params: Promise<{ storeId: string }>;
}) {
  const storeId = (await params).storeId;
  const billboards = await getBillboards(storeId);

  const formattedBillboards: BillboardColumn[] = billboards.map(
    (billboard) => ({
      id: billboard.id,
      label: billboard.label,
      createdAt: format(billboard.createdAt, "PP"),
    }),
  );

  return (
    <>
      <Heading
        title={`Billboards (${formattedBillboards.length})`}
        description="Manage all your billboards from one centralized dashboard."
      >
        <Button asChild>
          <Link href={`/dashboard/${storeId}/billboards/new`}>
            <PlusIcon />
            Add New
          </Link>
        </Button>
      </Heading>
      <Separator />
      <DataTable
        columns={columns}
        data={formattedBillboards}
        searchKey="label"
      />
      <Heading title="API" description="API calls for billboards" />
      <Separator />
      <ApiList entityName="billboards" entityIdName="billboardId" />
    </>
  );
}
