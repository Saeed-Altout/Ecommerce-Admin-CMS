import { db } from "@/lib/db";

export async function getCategories() {
  try {
    const categories = await db.category.findMany();
    return categories;
  } catch {
    return [];
  }
}

export async function getCategory(categoryId: string) {
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
