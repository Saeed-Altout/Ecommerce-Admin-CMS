import { type NextRequest, NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/lib/db";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { storeId: string } },
) {
  try {
    const { name } = await request.json();
    const user = await currentUser();

    if (!user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    const store = await db.store.updateMany({
      where: {
        id: params.storeId,
        userId: user.id,
      },
      data: {
        name,
      },
    });

    return new NextResponse(JSON.stringify(store), { status: 200 });
  } catch (error) {
    console.log("ERROR PATCH STORES ROUTE", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { storeId: string } },
) {
  try {
    const user = await currentUser();

    if (!user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const store = await db.store.deleteMany({
      where: {
        id: params.storeId,
        userId: user.id,
      },
    });

    return new NextResponse(JSON.stringify(store), { status: 200 });
  } catch (error) {
    console.log("ERROR DELETE STORES ROUTE", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
