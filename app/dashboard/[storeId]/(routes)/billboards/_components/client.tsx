"use client";
import { PlusIcon } from "lucide-react";
import { useRouter, useParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";
import { ApiList } from "@/components/ui/api-list";

import { BillboardColumn, columns } from "./columns";

export function BillboardsClient({ data }: { data: BillboardColumn[] }) {
  const params = useParams();
  const router = useRouter();

  return (
    <>
      <Heading
        title={`Billboards (${data.length})`}
        description="Manage your billboards"
      >
        <Button
          onClick={() => router.push(`/${params.storeId}/billboards/new`)}
        >
          <PlusIcon className="size-4" />
          Add New
        </Button>
      </Heading>
      <Separator />
      <DataTable columns={columns} data={data} searchKey="label" />
      <Heading title="API" description="Apis calls for Billboards" />
      <Separator />
      <ApiList entityName="billboards" entityIdName="billboardId" />
    </>
  );
}
