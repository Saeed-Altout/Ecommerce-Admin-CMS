import { db } from "@/lib/db";

export async function getOrdersByStoreId(storeId: string) {
  try {
    const orders = db.order.findMany({
      where: { storeId },
      include: {
        orderItems: { include: { product: true } },
      },
      orderBy: { createdAt: "desc" },
    });
    return orders;
  } catch {
    return [];
  }
}
