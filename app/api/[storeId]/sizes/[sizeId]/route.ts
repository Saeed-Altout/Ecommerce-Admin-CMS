import { type NextRequest, NextResponse } from "next/server";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET(
  _request: NextRequest,
  ctx: RouteContext<"/api/[storeId]/sizes/[sizeId]">,
) {
  try {
    const user = await currentUser();
    const { storeId, sizeId } = await ctx.params;

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

    const size = await db.size.findFirst({
      where: {
        id: sizeId,
        storeId,
      },
    });

    return new NextResponse(JSON.stringify(size), { status: 200 });
  } catch (error) {
    console.log("ERROR GET SIZES ROUTE", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function PATCH(
  request: NextRequest,
  ctx: RouteContext<"/api/[storeId]/sizes/[sizeId]">,
) {
  try {
    const { name, value } = await request.json();
    const user = await currentUser();
    const { storeId, sizeId } = await ctx.params;

    if (!user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!storeId) {
      return new NextResponse("Store ID is required", { status: 400 });
    }

    if (!sizeId) {
      return new NextResponse("Size ID is required", { status: 400 });
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

    const size = await db.size.updateMany({
      where: {
        id: sizeId,
        storeId,
      },
      data: {
        name,
        value,
      },
    });

    return new NextResponse(JSON.stringify(size), { status: 200 });
  } catch (error) {
    console.log("ERROR PATCH SIZES ROUTE", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function DELETE(
  _request: NextRequest,
  ctx: RouteContext<"/api/[storeId]/sizes/[sizeId]">,
) {
  try {
    const user = await currentUser();
    const { storeId, sizeId } = await ctx.params;

    if (!user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!storeId) {
      return new NextResponse("Store ID is required", { status: 400 });
    }

    if (!sizeId) {
      return new NextResponse("Size ID is required", { status: 400 });
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

    const size = await db.size.deleteMany({
      where: {
        id: sizeId,
        storeId,
      },
    });

    return new NextResponse(JSON.stringify(size), { status: 200 });
  } catch (error) {
    console.log("ERROR DELETE SIZES ROUTE", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
