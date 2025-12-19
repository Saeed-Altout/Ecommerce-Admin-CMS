import { db } from "@/lib/db";

export async function getColors() {
  try {
    const colors = await db.color.findMany();
    return colors;
  } catch {
    return [];
  }
}

export async function getColor(colorId: string) {
  try {
    const color = await db.color.findUnique({
      where: { id: colorId },
    });
    return color;
  } catch {
    return null;
  }
}
