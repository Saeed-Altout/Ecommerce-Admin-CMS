import { db } from "@/lib/db";

export async function getProducts() {
  try {
    const products = await db.product.findMany({
      include: { images: true, size: true, category: true, color: true },
    });
    return products;
  } catch {
    return [];
  }
}
