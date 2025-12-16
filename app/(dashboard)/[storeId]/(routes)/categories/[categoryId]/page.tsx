import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import { db } from "@/lib/db";

import { CategoryForm } from "./_components/category-form";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ categoryId: string; storeId: string }>;
}) {
  const categoryId = (await params).categoryId;
  const storeId = (await params).storeId;
  const user = await currentUser();

  if (!user?.id) {
    redirect("/sign-in");
  }

  const category = await db.category.findUnique({
    where: {
      id: categoryId,
    },
  });

  const billboards = await db.billboard.findMany({
    where: {
      storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return <CategoryForm initialData={category} billboards={billboards} />;
}
