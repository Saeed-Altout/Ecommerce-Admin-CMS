import { type NextRequest, NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/lib/db";

export async function POST(
  request: NextRequest,
  ctx: RouteContext<"/api/[storeId]/categories">,
) {
  try {
    const { name, billboardId } = await request.json();
    const user = await currentUser();
    const { storeId } = await ctx.params;

    if (!user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!billboardId) {
      return new NextResponse("Billboard ID is required", { status: 400 });
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

    const category = await db.category.create({
      data: {
        name,
        billboardId,
        storeId,
      },
    });

    return new NextResponse(JSON.stringify(category), { status: 201 });
  } catch (error) {
    console.log("ERROR POST CATEGORIES ROUTE", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function GET(
  _request: NextRequest,
  ctx: RouteContext<"/api/[storeId]/categories">,
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

    const categories = await db.category.findMany({
      where: {
        storeId,
      },
    });

    return new NextResponse(JSON.stringify(categories), { status: 200 });
  } catch (error) {
    console.log("ERROR GET CATEGORIES ROUTE", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
