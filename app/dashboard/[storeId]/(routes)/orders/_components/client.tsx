"use client";

import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";

import { OrderColumn, columns } from "./columns";

export function OrdersClient({ data }: { data: OrderColumn[] }) {
  return (
    <>
      <Heading
        title={`Orders (${data.length})`}
        description="Manage your orders"
      />
      <Separator />
      <DataTable columns={columns} data={data} searchKey="products" />
    </>
  );
}
