import Stripe from "stripe";

import { type NextRequest, NextResponse } from "next/server";

import { stripe } from "@/lib/stripe";
import { db } from "@/lib/db";

// Disable body parsing, need raw body for Stripe webhook signature verification
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  console.log("Webhook: Received webhook request");

  const body = await request.text();
  const signature = request.headers.get("Stripe-Signature") as string;

  if (!signature) {
    console.error("Webhook Error: No Stripe-Signature header found");
    return new NextResponse("No signature", { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!,
    );
    console.log("Webhook: Event constructed successfully", {
      type: event.type,
      id: event.id,
    });
  } catch (error) {
    console.error("Webhook Error: Failed to construct event", error);
    return new NextResponse(`Webhook Error: ${error}`, { status: 400 });
  }

  const session = event.data.object as Stripe.Checkout.Session;

  console.log("Webhook: Processing event", {
    type: event.type,
    sessionId: session.id,
    metadata: session.metadata,
  });

  if (event.type === "checkout.session.completed") {
    const orderId = session.metadata?.orderId;

    if (!orderId) {
      console.error("Webhook Error: orderId not found in session metadata", {
        sessionId: session.id,
        metadata: session.metadata,
      });
      return new NextResponse("Order ID not found", { status: 400 });
    }

    console.log("Webhook: Processing checkout.session.completed", { orderId });

    try {
      // Retrieve the full session with expanded customer details
      const fullSession = await stripe.checkout.sessions.retrieve(session.id, {
        expand: ["customer_details"],
      });

      console.log("Webhook: Full session retrieved", {
        sessionId: fullSession.id,
        orderId,
        customerDetails: fullSession.customer_details,
        paymentStatus: fullSession.payment_status,
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

      console.log("Webhook: Updating order", {
        orderId,
        isPaid: true,
        address: addressString,
        phone,
      });

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
        const updatedOrderItems = await db.orderItem.updateMany({
          where: {
            orderId: orderId,
          },
          data: {
            updatedAt: new Date(),
          },
        });

        console.log("Webhook: OrderItems updated", {
          orderId: orderId,
          updatedCount: updatedOrderItems.count,
        });
      }

      console.log("Webhook: Order updated successfully", {
        orderId: order.id,
        isPaid: order.isPaid,
        address: order.address,
        phone: order.phone,
        orderItemsCount: order.orderItems.length,
      });

      if (!order.orderItems || order.orderItems.length === 0) {
        console.error(
          `Webhook Warning: No orderItems found for order ${orderId}`,
        );
        return new NextResponse("No order items found", { status: 400 });
      }

      const productIds = order.orderItems.map((item) => item.productId);

      if (productIds.length === 0) {
        console.error(
          `Webhook Warning: No productIds extracted from orderItems for order ${orderId}`,
        );
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

      console.log(
        `Webhook Success: Order ${orderId} updated with ${productIds.length} products archived`,
      );
    } catch (error) {
      console.error("Webhook Error: Failed to update order", {
        error,
        message: error instanceof Error ? error.message : "Unknown error",
        stack: error instanceof Error ? error.stack : undefined,
        orderId,
      });
      return new NextResponse(
        `Failed to update order: ${error instanceof Error ? error.message : "Unknown error"}`,
        { status: 500 },
      );
    }
  } else {
    console.log("Webhook: Event type not handled", { type: event.type });
  }

  return new NextResponse(null, { status: 200 });
}
