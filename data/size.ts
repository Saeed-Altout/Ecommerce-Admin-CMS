import { db } from "@/lib/db";

export async function getSizes() {
  try {
    const sizes = await db.size.findMany();
    return sizes;
  } catch {
    return [];
  }
}

export async function getSize(sizeId: string) {
  try {
    const size = await db.size.findUnique({
      where: { id: sizeId },
    });
    return size;
  } catch {
    return null;
  }
}
