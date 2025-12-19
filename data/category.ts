import { db } from "@/lib/db";

export async function getCategories() {
  try {
    const categories = await db.category.findMany();
    return categories;
  } catch {
    return [];
  }
}

export async function getCategoriesByStoreId(storeId: string) {
  try {
    const categories = await db.category.findMany({
      where: {
        storeId,
      },
      include: {
        billboard: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return categories;
  } catch {
    return [];
  }
}

export async function getCategoryById(categoryId: string) {
  try {
    const category = await db.category.findUnique({
      where: { id: categoryId },
      include: { billboard: true },
    });
    return category;
  } catch {
    return null;
  }
}
