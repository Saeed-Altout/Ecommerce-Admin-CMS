"use client";
import { PlusIcon } from "lucide-react";
import { useRouter, useParams } from "next/navigation";
import { format } from "date-fns";

import { Billboard } from "@/lib/generated/prisma/client";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";

import { BillboardColumn, columns } from "./columns";
import { ApiList } from "@/components/ui/api-list";

export function BillboardsClient({ data }: { data: Billboard[] }) {
  const params = useParams();
  const router = useRouter();

  const formattedBillboards: BillboardColumn[] = data.map((billboard) => ({
    id: billboard.id,
    label: billboard.label,
    createdAt: format(billboard.createdAt, "PPP"),
  }));

  return (
    <>
      <Heading
        title={`Billboards (${formattedBillboards.length})`}
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
      <DataTable
        columns={columns}
        data={formattedBillboards}
        searchKey="label"
      />
      <Heading title="API" description="Apis calls for Billboards" />
      <Separator />
      <ApiList entityName="billboards" entityIdName="billboardId" />
    </>
  );
}
