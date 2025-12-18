"use server";
import { currentRole } from "@/lib/auth";
import { UserRole } from "@/lib/prisma/enums";

export const admin = async () => {
  const role = await currentRole();

  if (role !== UserRole.ADMIN) {
    return { error: "You are not authorized to access this page" };
  }
  return { success: "You are authorized to access this page" };
};
