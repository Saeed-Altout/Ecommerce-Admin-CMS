import { db } from "@/lib/db";

export async function getTotalRevenue(storeId: string) {
  const paidOrders = await db.order.findMany({
    where: { storeId, isPaid: true },
    include: { orderItems: { include: { product: true } } },
  });

  const totalRevenue = paidOrders.reduce((total, order) => {
    const orderTotal = order.orderItems.reduce((orderSum, item) => {
      return orderSum + item.product.price.toNumber();
    }, 0);

    return total + orderTotal;
  }, 0);

  return totalRevenue;
}

export async function getSalesCount(storeId: string) {
  const salesCount = await db.order.count({
    where: { storeId, isPaid: true },
  });

  return salesCount;
}

export async function getStoreCount(storeId: string) {
  const storeCount = await db.product.count({
    where: { storeId, isArchived: false },
  });

  return storeCount;
}

export interface GraphData {
  date: string;
  revenue: number;
}

/**
 * Get daily revenue data for the last 90 days
 * Returns data in format: { date: "YYYY-MM-DD", revenue: number }
 */
export async function getGraphRevenue(storeId: string) {
  const paidOrders = await db.order.findMany({
    where: {
      storeId,
      isPaid: true,
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

  // Calculate date range (last 90 days)
  const endDate = new Date();
  endDate.setHours(23, 59, 59, 999);
  const startDate = new Date(endDate);
  startDate.setDate(startDate.getDate() - 90);
  startDate.setHours(0, 0, 0, 0);

  // Initialize daily revenue map with all dates in range
  const dailyRevenue: Map<string, number> = new Map();
  const currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    const dateKey = currentDate.toISOString().split("T")[0];
    dailyRevenue.set(dateKey, 0);
    currentDate.setDate(currentDate.getDate() + 1);
  }

  // Calculate revenue for each order
  for (const order of paidOrders) {
    const orderDate = new Date(order.createdAt);
    const dateKey = orderDate.toISOString().split("T")[0];

    // Only process orders within the date range
    if (orderDate >= startDate && orderDate <= endDate) {
      let revenueForOrder = 0;

      for (const item of order.orderItems) {
        revenueForOrder += Number(item.product.price);
      }

      const currentRevenue = dailyRevenue.get(dateKey) || 0;
      dailyRevenue.set(dateKey, currentRevenue + revenueForOrder);
    }
  }

  // Convert map to array and sort by date
  const graphData: GraphData[] = Array.from(dailyRevenue.entries())
    .map(([date, revenue]) => ({
      date,
      revenue: Math.round(revenue * 100) / 100, // Round to 2 decimal places
    }))
    .sort((a, b) => a.date.localeCompare(b.date));

  return graphData;
}
