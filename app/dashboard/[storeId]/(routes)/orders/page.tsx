import { format } from "date-fns";

import { getOrdersByStoreId } from "@/data/order";
import { OrderColumn, columns } from "./_components/columns";

import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";

export default async function OrdersPage({
  params,
}: {
  params: Promise<{ storeId: string }>;
}) {
  const storeId = (await params).storeId;
  const orders = await getOrdersByStoreId(storeId);

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
    createdAt: format(order.createdAt, "PP"),
  }));

  return (
    <>
      <Heading
        title={`Orders (${formattedOrders.length})`}
        description="Manage all your orders from one centralized dashboard."
      />
      <Separator />
      <DataTable
        columns={columns}
        data={formattedOrders}
        searchKey="products"
      />
    </>
  );
}
