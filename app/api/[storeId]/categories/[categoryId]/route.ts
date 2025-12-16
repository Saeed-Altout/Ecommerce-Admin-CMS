import { type NextRequest, NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/lib/db";

export async function GET(
  _request: NextRequest,
  ctx: RouteContext<"/api/[storeId]/categories/[categoryId]">,
) {
  try {
    const user = await currentUser();
    const { storeId, categoryId } = await ctx.params;

    if (!user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!storeId) {
      return new NextResponse("Store ID is required", { status: 400 });
    }

    if (!categoryId) {
      return new NextResponse("Category ID is required", { status: 400 });
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

    const category = await db.category.findFirst({
      where: {
        id: categoryId,
        storeId,
      },
    });

    return new NextResponse(JSON.stringify(category), { status: 200 });
  } catch (error) {
    console.log("ERROR GET CATEGORIES ROUTE", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function PATCH(
  request: NextRequest,
  ctx: RouteContext<"/api/[storeId]/categories/[categoryId]">,
) {
  try {
    const { name, billboardId } = await request.json();
    const user = await currentUser();
    const { storeId, categoryId } = await ctx.params;

    if (!user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!storeId) {
      return new NextResponse("Store ID is required", { status: 400 });
    }

    if (!categoryId) {
      return new NextResponse("Category ID is required", { status: 400 });
    }

    if (!billboardId) {
      return new NextResponse("Billboard ID is required", { status: 400 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!billboardId) {
      return new NextResponse("Billboard ID is required", { status: 400 });
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

    const category = await db.category.updateMany({
      where: {
        id: categoryId,
        storeId,
      },
      data: {
        name,
        billboardId,
      },
    });

    return new NextResponse(JSON.stringify(category), { status: 200 });
  } catch (error) {
    console.log("ERROR PATCH CATEGORIES ROUTE", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function DELETE(
  _request: NextRequest,
  ctx: RouteContext<"/api/[storeId]/categories/[categoryId]">,
) {
  try {
    const user = await currentUser();
    const { storeId, categoryId } = await ctx.params;

    if (!user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!storeId) {
      return new NextResponse("Store ID is required", { status: 400 });
    }

    if (!categoryId) {
      return new NextResponse("Category ID is required", { status: 400 });
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

    const category = await db.category.deleteMany({
      where: {
        id: categoryId,
        storeId,
      },
    });

    return new NextResponse(JSON.stringify(category), { status: 200 });
  } catch (error) {
    console.log("ERROR DELETE CATEGORIES ROUTE", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
