import { type NextRequest, NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
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

    const { storeId } = await params;

    if (!user?.id) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!price) new NextResponse("Price is required", { status: 400 });

    if (!categoryId)
      new NextResponse("Category id is required", { status: 400 });

    if (!colorId) new NextResponse("Color id is required", { status: 400 });

    if (!sizeId) new NextResponse("Size id is required", { status: 400 });

    if (!isFeatured) new NextResponse("Featured is required", { status: 400 });

    if (!isArchived) new NextResponse("Archived is required", { status: 400 });

    if (!storeId) {
      return new NextResponse("Store Id is required", { status: 400 });
    }

    const storeByUserId = await db.store.findFirst({
      where: {
        id: storeId,
        userId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    const product = await db.product.create({
      data: {
        name,
        images: {
          createMany: {
            data: [...images.map((image: { url: string }) => image)],
          },
        },
        price,
        isFeatured,
        isArchived,
        categoryId,
        sizeId,
        colorId,
        storeId: storeId,
      },
    });

    return NextResponse.json(product);
  } catch (err) {
    console.log(`[PRODUCTS_POST] ${err}`);
    return new NextResponse(`Internal error`, { status: 500 });
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

    return NextResponse.json(products);
  } catch (err) {
    console.log(`[PRODUCTS_GET] ${err}`);
    return new NextResponse(`Internal error`, { status: 500 });
  }
}
