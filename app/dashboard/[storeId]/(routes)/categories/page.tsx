import Link from "next/link";

import { format } from "date-fns";
import { PlusIcon } from "lucide-react";

import { CategoryColumn, columns } from "./_components/columns";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";
import { ApiList } from "@/components/ui/api-list";
import { getCategoriesByStoreId } from "@/data/category";

export default async function CategoriesPage({
  params,
}: {
  params: Promise<{ storeId: string }>;
}) {
  const storeId = (await params).storeId;
  const categories = await getCategoriesByStoreId(storeId);

  const formattedCategories: CategoryColumn[] = categories.map((category) => ({
    id: category.id,
    name: category.name,
    billboardLabel: category.billboard.label,
    createdAt: format(category.createdAt, "PPP"),
  }));

  return (
    <>
      <Heading
        title={`Categories (${formattedCategories.length})`}
        description="Manage all your categories from one centralized dashboard."
      >
        <Button asChild>
          <Link href={`/dashboard/${storeId}/categories/new`}>
            <PlusIcon />
            Add New
          </Link>
        </Button>
      </Heading>
      <Separator />
      <DataTable
        columns={columns}
        data={formattedCategories}
        searchKey="name"
      />
      <Heading title="API" description="Apis calls for categories" />
      <Separator />
      <ApiList entityName="categories" entityIdName="categoryId" />
    </>
  );
}
