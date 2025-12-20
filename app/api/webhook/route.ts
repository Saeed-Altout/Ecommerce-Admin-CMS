import Stripe from "stripe";

import { type NextRequest, NextResponse } from "next/server";

import { stripe } from "@/lib/stripe";
import { db } from "@/lib/db";

// Disable body parsing, need raw body for Stripe webhook signature verification
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get("Stripe-Signature") as string;

  if (!signature) {
    return new NextResponse("No signature", { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!,
    );
  } catch (error) {
    return new NextResponse(`Webhook Error: ${error}`, { status: 400 });
  }

  const session = event.data.object as Stripe.Checkout.Session;

  if (event.type === "checkout.session.completed") {
    const orderId = session.metadata?.orderId;

    if (!orderId) {
      return new NextResponse("Order ID not found", { status: 400 });
    }

    try {
      // Retrieve the full session with expanded customer details
      const fullSession = await stripe.checkout.sessions.retrieve(session.id, {
        expand: ["customer_details"],
      });

      const address = fullSession.customer_details?.address;
      const addressComponents = [
        address?.line1,
        address?.line2,
        address?.city,
        address?.state,
        address?.country,
        address?.postal_code,
      ];

      const addressString = addressComponents
        .filter((c) => c !== null)
        .join(", ");
      const phone = fullSession.customer_details?.phone || "";

      // First update the order
      const order = await db.order.update({
        where: { id: orderId },
        data: {
          isPaid: true,
          address: addressString,
          phone: phone,
        },
        include: {
          orderItems: true,
        },
      });

      // Update orderItems' updatedAt timestamp to reflect they're part of a paid order
      if (order.orderItems && order.orderItems.length > 0) {
        await db.orderItem.updateMany({
          where: {
            orderId: orderId,
          },
          data: {
            updatedAt: new Date(),
          },
        });
      }

      if (!order.orderItems || order.orderItems.length === 0) {
        return new NextResponse("No order items found", { status: 400 });
      }

      const productIds = order.orderItems.map((item) => item.productId);

      if (productIds.length === 0) {
        return new NextResponse("No product IDs found", { status: 400 });
      }

      await db.product.updateMany({
        where: {
          id: {
            in: productIds,
          },
        },
        data: {
          isArchived: true,
        },
      });
    } catch (error) {
      return new NextResponse(
        `Failed to update order: ${error instanceof Error ? error.message : "Unknown error"}`,
        { status: 500 },
      );
    }
  }

  return new NextResponse(null, { status: 200 });
}
