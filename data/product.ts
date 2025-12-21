import { db } from "@/lib/db";

export async function getProducts() {
  try {
    const products = await db.product.findMany({
      include: {
        images: true,
        size: true,
        category: true,
        color: true,
      },
      orderBy: { createdAt: "desc" },
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

export async function getProductsByStoreId(storeId: string) {
  try {
    const products = await db.product.findMany({
      where: {
        storeId,
      },
      include: {
        category: true,
        size: true,
        color: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return products;
  } catch {
    return [];
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
      where: { categoryId, colorId, sizeId, isArchived: false },
    });
    return products;
  } catch {
    return [];
  }
}

export async function getProductById(productId: string) {
  try {
    const product = await db.product.findUnique({
      where: {
        id: productId,
      },
      include: {
        images: true,
      },
    });
    return product;
  } catch {
    return null;
  }
}
