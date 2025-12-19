import { format } from "date-fns";

import { db } from "@/lib/db";

import { OrdersClient } from "./_components/client";
import { OrderColumn } from "./_components/columns";

export default async function OrdersPage({
  params,
}: {
  params: Promise<{ storeId: string }>;
}) {
  const storeId = (await params).storeId;
  const orders = await db.order.findMany({
    where: {
      storeId,
    },
    include: {
      orderItems: {
        include: {
          product: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedOrders: OrderColumn[] = orders.map((order) => ({
    id: order.id,
    phone: order.phone,
    address: order.address,
    isPaid: order.isPaid,
    products: order.orderItems.map((item) => item.product.name).join(", "),
    totalPrice: order.orderItems.reduce(
      (total, item) => +item.product.price + total,
      0,
    ),
    createdAt: format(order.createdAt, "PPP"),
  }));

  return <OrdersClient data={formattedOrders} />;
}
