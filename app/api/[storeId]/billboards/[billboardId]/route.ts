import { type NextRequest, NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/lib/db";

export async function GET(
  _request: NextRequest,
  ctx: RouteContext<"/api/[storeId]/billboards/[billboardId]">,
) {
  try {
    const { storeId, billboardId } = await ctx.params;

    if (!storeId) {
      return new NextResponse("Store ID is required", { status: 400 });
    }

    const store = await db.store.findFirst({
      where: {
        id: storeId,
      },
    });

    if (!store) {
      return new NextResponse("Store not found", { status: 404 });
    }

    const billboard = await db.billboard.findFirst({
      where: {
        id: billboardId,
        storeId,
      },
    });

    return new NextResponse(JSON.stringify(billboard), { status: 200 });
  } catch (error) {
    console.log("ERROR GET BILLBOARDS ROUTE", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function PATCH(
  request: NextRequest,
  ctx: RouteContext<"/api/[storeId]/billboards/[billboardId]">,
) {
  try {
    const { label, imageUrl } = await request.json();
    const user = await currentUser();
    const { storeId, billboardId } = await ctx.params;

    if (!user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!storeId) {
      return new NextResponse("Store ID is required", { status: 400 });
    }

    if (!billboardId) {
      return new NextResponse("Billboard ID is required", { status: 400 });
    }

    if (!label) {
      return new NextResponse("Label is required", { status: 400 });
    }

    if (!imageUrl) {
      return new NextResponse("Image Url is required", { status: 400 });
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

    const billboard = await db.billboard.updateMany({
      where: {
        id: billboardId,
        storeId,
      },
      data: {
        label,
        imageUrl,
      },
    });

    return new NextResponse(JSON.stringify(billboard), { status: 200 });
  } catch (error) {
    console.log("ERROR PATCH BILLBOARDS ROUTE", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function DELETE(
  _request: NextRequest,
  ctx: RouteContext<"/api/[storeId]/billboards/[billboardId]">,
) {
  try {
    const user = await currentUser();
    const { storeId, billboardId } = await ctx.params;

    if (!user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!storeId) {
      return new NextResponse("Store ID is required", { status: 400 });
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

    const billboard = await db.billboard.deleteMany({
      where: {
        id: billboardId,
        storeId,
      },
    });

    return new NextResponse(JSON.stringify(billboard), { status: 200 });
  } catch (error) {
    console.log("ERROR DELETE BILLBOARDS ROUTE", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
