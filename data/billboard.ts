import { db } from "@/lib/db";

export const getBillboard = async (id: string) => {
  try {
    const billboard = await db.billboard.findUnique({
      where: { id },
    });
    return billboard;
  } catch {
    return null;
  }
};
