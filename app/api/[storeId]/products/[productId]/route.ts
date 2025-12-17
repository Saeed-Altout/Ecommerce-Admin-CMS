import { type NextRequest, NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/lib/db";

export async function GET(
  _request: NextRequest,
  ctx: RouteContext<"/api/[storeId]/products/[productId]">,
) {
  try {
    const user = await currentUser();
    const { storeId, productId } = await ctx.params;

    if (!user?.id) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!productId) {
      return new NextResponse("Product id is required", { status: 400 });
    }

    if (!storeId) {
      return new NextResponse("Store id is required", { status: 400 });
    }

    const product = await db.product.findUnique({
      where: {
        id: productId,
        storeId,
      },
      include: {
        images: true,
        category: true,
        size: true,
        color: true,
      },
    });

    return new NextResponse(JSON.stringify(product), { status: 200 });
  } catch (error) {
    console.log("ERROR GET PRODUCT ROUTE", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function PATCH(
  request: NextRequest,
  ctx: RouteContext<"/api/[storeId]/products/[productId]">,
) {
  try {
    const { storeId, productId } = await ctx.params;
    const user = await currentUser();
    const body = await request.json();

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
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
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

    if (!images || !images.length) {
      return new NextResponse("Image is required", { status: 400 });
    }

    if (!productId) {
      return new NextResponse("Product id is required", { status: 400 });
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

    await db.product.update({
      where: {
        id: productId,
      },
      data: {
        name,
        price,
        isFeatured,
        isArchived,
        categoryId,
        sizeId,
        colorId,
        images: {
          deleteMany: {},
        },
        storeId: storeId,
      },
    });

    const product = await db.product.update({
      where: {
        id: productId,
      },
      data: {
        images: {
          createMany: {
            data: [...images.map((image: { url: string }) => image)],
          },
        },
      },
    });

    return new NextResponse(JSON.stringify(product), { status: 200 });
  } catch (error) {
    console.log("ERROR PATCH PRODUCTS ROUTE", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function DELETE(
  _request: NextRequest,
  ctx: RouteContext<"/api/[storeId]/products/[productId]">,
) {
  try {
    const user = await currentUser();
    const { storeId, productId } = await ctx.params;

    if (!user?.id) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!productId) {
      return new NextResponse("Product id is required", { status: 400 });
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

    const product = await db.product.deleteMany({
      where: {
        id: productId,
      },
    });

    return new NextResponse(JSON.stringify(product), { status: 200 });
  } catch (error) {
    console.log("ERROR DELETE PRODUCTS ROUTE", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
