import { db } from "@/lib/db";

export async function getCategories() {
  try {
    const categories = await db.category.findMany();
    return categories;
  } catch {
    return [];
  }
}
