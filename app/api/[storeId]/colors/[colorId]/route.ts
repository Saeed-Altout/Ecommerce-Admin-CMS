import { type NextRequest, NextResponse } from "next/server";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET(
  _request: NextRequest,
  ctx: RouteContext<"/api/[storeId]/colors/[colorId]">,
) {
  try {
    const user = await currentUser();
    const { storeId, colorId } = await ctx.params;

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

    const color = await db.color.findFirst({
      where: {
        id: colorId,
        storeId,
      },
    });

    return new NextResponse(JSON.stringify(color), { status: 200 });
  } catch (error) {
    console.log("ERROR GET COLORS ROUTE", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function PATCH(
  request: NextRequest,
  ctx: RouteContext<"/api/[storeId]/colors/[colorId]">,
) {
  try {
    const { name, value } = await request.json();
    const user = await currentUser();
    const { storeId, colorId } = await ctx.params;

    if (!user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!storeId) {
      return new NextResponse("Store ID is required", { status: 400 });
    }

    if (!colorId) {
      return new NextResponse("color ID is required", { status: 400 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!value) {
      return new NextResponse("Value is required", { status: 400 });
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

    const color = await db.color.updateMany({
      where: {
        id: colorId,
        storeId,
      },
      data: {
        name,
        value,
      },
    });

    return new NextResponse(JSON.stringify(color), { status: 200 });
  } catch (error) {
    console.log("ERROR PATCH COLORS ROUTE", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function DELETE(
  _request: NextRequest,
  ctx: RouteContext<"/api/[storeId]/colors/[colorId]">,
) {
  try {
    const user = await currentUser();
    const { storeId, colorId } = await ctx.params;

    if (!user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!storeId) {
      return new NextResponse("Store ID is required", { status: 400 });
    }

    if (!colorId) {
      return new NextResponse("color ID is required", { status: 400 });
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

    const color = await db.color.deleteMany({
      where: {
        id: colorId,
        storeId,
      },
    });

    return new NextResponse(JSON.stringify(color), { status: 200 });
  } catch (error) {
    console.log("ERROR DELETE COLORS ROUTE", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
