import { db } from "@/lib/db";

export async function getColorsByStoreId(storeId: string) {
  try {
    const colors = db.color.findMany({
      where: {
        storeId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return colors;
  } catch {
    return [];
  }
}

export async function getColorById(colorId: string) {
  try {
    const color = await db.color.findUnique({
      where: { id: colorId },
    });
    return color;
  } catch {
    return null;
  }
}
