import { db } from "@/lib/db";

export const getBillboardById = async (id: string) => {
  try {
    const billboard = await db.billboard.findUnique({
      where: { id },
    });
    return billboard;
  } catch {
    return null;
  }
};

export const getBillboardsByStoreId = async (storeId: string) => {
  try {
    const billboards = await db.billboard.findMany({
      where: { storeId },
      orderBy: { createdAt: "desc" },
    });
    return billboards;
  } catch {
    return [];
  }
};
