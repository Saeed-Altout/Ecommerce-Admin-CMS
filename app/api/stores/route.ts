import { type NextRequest, NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const { name } = await request.json();
    const user = await currentUser();

    if (!user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    const store = await db.store.create({
      data: {
        name,
        userId: user.id,
      },
    });

    return new NextResponse(JSON.stringify(store), { status: 201 });
  } catch (error) {
    console.log("ERROR POST STORES ROUTE", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
