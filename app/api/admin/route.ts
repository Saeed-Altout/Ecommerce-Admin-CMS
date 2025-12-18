import { NextResponse } from "next/server";
import { currentRole } from "@/lib/auth";
import { UserRole } from "@/lib/prisma/enums";

export async function GET() {
  const role = await currentRole();
  if (role !== UserRole.ADMIN) {
    return new NextResponse(null, { status: 403 });
  }
  return new NextResponse(null, { status: 200 });
}
