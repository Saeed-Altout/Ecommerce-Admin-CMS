"use client";
import { PlusIcon } from "lucide-react";
import { useRouter, useParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";
import { ApiList } from "@/components/ui/api-list";

import { CategoryColumn, columns } from "./columns";

export function CategoriesClient({ data }: { data: CategoryColumn[] }) {
  const params = useParams();
  const router = useRouter();

  return (
    <>
      <Heading
        title={`Categories (${data.length})`}
        description="Manage your categories"
      >
        <Button
          onClick={() => router.push(`/${params.storeId}/categories/new`)}
        >
          <PlusIcon className="size-4" />
          Add New
        </Button>
      </Heading>
      <Separator />
      <DataTable columns={columns} data={data} searchKey="name" />
      <Heading title="API" description="Apis calls for Categories" />
      <Separator />
      <ApiList entityName="categories" entityIdName="categoryId" />
    </>
  );
}
