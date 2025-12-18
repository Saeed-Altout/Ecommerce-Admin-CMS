import { type NextRequest, NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/lib/db";

export async function POST(
  request: NextRequest,
  ctx: RouteContext<"/api/[storeId]/billboards">,
) {
  try {
    const { label, imageUrl } = await request.json();
    const user = await currentUser();
    const { storeId } = await ctx.params;

    if (!user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!label) {
      return new NextResponse("Label is required", { status: 400 });
    }

    if (!imageUrl) {
      return new NextResponse("Image Background is required", { status: 400 });
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

    const billboard = await db.billboard.create({
      data: {
        label,
        storeId,
        imageUrl,
      },
    });

    return new NextResponse(JSON.stringify(billboard), { status: 201 });
  } catch (error) {
    console.log("ERROR POST BILLBOARDS ROUTE", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function GET(
  _request: NextRequest,
  ctx: RouteContext<"/api/[storeId]/billboards">,
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

    const billboards = await db.billboard.findMany({
      where: {
        storeId,
      },
    });

    return new NextResponse(JSON.stringify(billboards), { status: 200 });
  } catch (error) {
    console.log("ERROR GET BILLBOARDS ROUTE", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
