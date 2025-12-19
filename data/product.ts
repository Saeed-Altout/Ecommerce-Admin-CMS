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

export async function getProduct(productId: string) {
  try {
    const product = await db.product.findUnique({
      where: { id: productId },
      include: { images: true, size: true, category: true, color: true },
    });
    return product;
  } catch {
    return null;
  }
}

export async function getSuggestProducts({
  categoryId,
  colorId,
  sizeId,
}: {
  categoryId?: string;
  colorId?: string;
  sizeId?: string;
}) {
  try {
    const products = await db.product.findMany({
      include: { images: true, size: true, category: true, color: true },
      where: { categoryId, colorId, sizeId },
    });
    return products;
  } catch {
    return [];
  }
}
