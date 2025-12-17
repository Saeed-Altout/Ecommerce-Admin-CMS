import { type NextRequest, NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/lib/db";

export async function GET(
  _request: NextRequest,
  ctx: RouteContext<"/api/[storeId]/products/[productId]">,
) {
  try {
    const { storeId, productId } = await ctx.params;

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

    return NextResponse.json(product);
  } catch (err) {
    console.log("[PRODUCT_GET]", err);
    return new NextResponse("Internal error", { status: 500 });
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

    if (!price) new NextResponse("Price is required", { status: 400 });

    if (!categoryId)
      new NextResponse("Category id is required", { status: 400 });

    if (!colorId) new NextResponse("Color id is required", { status: 400 });

    if (!sizeId) new NextResponse("Size id is required", { status: 400 });

    if (!isFeatured) new NextResponse("Featured is required", { status: 400 });

    if (!isArchived) new NextResponse("Archived is required", { status: 400 });

    if (!images || !images.length) {
      return new NextResponse("Image is required", { status: 400 });
    }

    if (!productId) {
      return new NextResponse("Product id is required", { status: 400 });
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

    await db.product.update({
      where: {
        id: productId,
      },
      data: {
        name,
        images: {
          deleteMany: {},
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

    return NextResponse.json(product);
  } catch (err) {
    console.log("[PRODUCT_PATCH]", err);
    return new NextResponse("Internal error", { status: 500 });
  }
}

//// Delete Method

export async function DELETE(
  _request: NextRequest,
  ctx: RouteContext<"/api/[storeId]/products/[productId]">,
) {
  try {
    const { storeId, productId } = await ctx.params;
    const user = await currentUser();

    if (!user?.id) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!productId) {
      return new NextResponse("Product id is required", { status: 400 });
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

    const product = await db.product.deleteMany({
      where: {
        id: productId,
      },
    });

    return NextResponse.json(product);
  } catch (err) {
    console.log("[PRODUCT_DELETE]", err);
    return new NextResponse("Internal error", { status: 500 });
  }
}
