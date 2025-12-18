import { type NextRequest, NextResponse } from "next/server";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";

export async function POST(
  request: NextRequest,
  ctx: RouteContext<"/api/[storeId]/products">,
) {
  try {
    const body = await request.json();
    const user = await currentUser();
    const { storeId } = await ctx.params;

    const {
      name,
      price,
      categoryId,
      colorId,
      sizeId,
      images,
      isFeatured,
      isArchived,
    } = body;

    if (!user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!images || !images.length) {
      return new NextResponse("Image is required", { status: 400 });
    }

    if (!price) {
      return new NextResponse("Price is required", { status: 400 });
    }

    if (!categoryId) {
      return new NextResponse("Category id is required", { status: 400 });
    }

    if (!colorId) {
      return new NextResponse("Color id is required", { status: 400 });
    }

    if (!sizeId) {
      return new NextResponse("Size id is required", { status: 400 });
    }

    if (!storeId) {
      return new NextResponse("Store Id is required", { status: 400 });
    }

    const storeByUserId = await db.store.findFirst({
      where: {
        id: storeId,
        userId: user.id,
      },
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    const product = await db.product.create({
      data: {
        name,
        price,
        isFeatured,
        isArchived,
        categoryId,
        sizeId,
        colorId,
        images: {
          createMany: {
            data: [...images.map((image: { url: string }) => image)],
          },
        },
        storeId: storeId,
      },
    });

    return new NextResponse(JSON.stringify(product), { status: 201 });
  } catch (error) {
    console.log("ERROR POST PRODUCTS ROUTE", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function GET(
  request: NextRequest,
  ctx: RouteContext<"/api/[storeId]/products">,
) {
  try {
    const { storeId } = await ctx.params;
    const { searchParams } = new URL(request.url);

    const categoryId = searchParams.get("categoryId") || undefined;
    const sizeId = searchParams.get("sizeId") || undefined;
    const colorId = searchParams.get("colorId") || undefined;
    const isFeatured = searchParams.get("isFeatured");

    if (!storeId) {
      return new NextResponse("Store Id is required", { status: 400 });
    }

    const products = await db.product.findMany({
      where: {
        storeId: storeId,
        categoryId,
        colorId,
        sizeId,
        isFeatured: isFeatured ? true : undefined,
        isArchived: false,
      },
      include: {
        images: true,
        category: true,
        color: true,
        size: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return new NextResponse(JSON.stringify(products), { status: 200 });
  } catch (error) {
    console.log("ERROR GET PRODUCTS ROUTE", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
