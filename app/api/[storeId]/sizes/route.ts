import { type NextRequest, NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/lib/db";

export async function POST(
  request: NextRequest,
  ctx: RouteContext<"/api/[storeId]/sizes">,
) {
  try {
    const { name, value } = await request.json();
    const user = await currentUser();
    const { storeId } = await ctx.params;

    if (!user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!value) {
      return new NextResponse("Value is required", { status: 400 });
    }

    if (!storeId) {
      return new NextResponse("Store ID is required", { status: 400 });
    }

    const store = await db.store.findFirst({
      where: {
        id: storeId,
        userId: user.id,
      },
    });

    if (!store) {
      return new NextResponse("Store not found", { status: 404 });
    }

    const size = await db.size.create({
      data: {
        name,
        value,
        storeId,
      },
    });

    return new NextResponse(JSON.stringify(size), { status: 201 });
  } catch (error) {
    console.log("ERROR POST SIZES ROUTE", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function GET(
  _request: NextRequest,
  ctx: RouteContext<"/api/[storeId]/sizes">,
) {
  try {
    const user = await currentUser();
    const { storeId } = await ctx.params;

    if (!user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!storeId) {
      return new NextResponse("Store ID is required", { status: 400 });
    }

    const store = await db.store.findFirst({
      where: {
        id: storeId,
        userId: user.id,
      },
    });

    if (!store) {
      return new NextResponse("Store not found", { status: 404 });
    }

    const sizes = await db.size.findMany({
      where: {
        storeId,
      },
    });

    return new NextResponse(JSON.stringify(sizes), { status: 200 });
  } catch (error) {
    console.log("ERROR GET SIZES ROUTE", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
