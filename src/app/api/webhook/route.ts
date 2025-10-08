import client from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: NextRequest) {
  try {
    const signature = req.headers.get("stripe-signature");
    const rawBody = await req.text();
    let event: Stripe.Event;
    let data: unknown;

    try {
      const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: "2025-09-30.clover" });

      event = stripe.webhooks.constructEvent(
        rawBody,
        signature!,
        process.env.STRIPE_WEBHOOK_SECRET!
      );
      data = event.data.object;
    } catch (err) {
      console.error("Webhook signature verification failed", err);
      return NextResponse.json({ error: "Webhook error" }, { status: 400 });
    }

    const db = await client.connect();
    // store raw event payload for debugging/audit
    await db.db("payment-manager").collection("webhooks").insertOne({ receivedAt: new Date(), event });

    switch (event.type) {
      case "checkout.session.completed": {
        // When a Checkout Session is completed, the session object is returned
        // We expect metadata.productId and metadata.userId (or client_reference_id) to be set
        const session = data as Stripe.Checkout.Session;

        const productId = session.metadata?.productId as string | undefined;
        const userId = session.metadata?.userId as string | undefined || session.client_reference_id as string | undefined;

        if (!productId) {
          console.warn("checkout.session.completed received without productId metadata", { sessionId: session.id });
          break;
        }

        try {
          // Update the product with the userId that purchased it
          const updateResult = await db
            .db("payment-manager")
            .collection("products")
            .updateOne(
              { _id: new (await import("mongodb")).ObjectId(productId) },
              { $set: { userId: new ObjectId(userId), purchasedAt: new Date() } }
            );

          console.log("Product update result for webhook:", updateResult);
        } catch (updateErr) {
          console.error("Failed to update product after checkout.session.completed", updateErr);
        }

        break;
      }
      case 'payment_intent.succeeded':
        // Do nothing for now
        break;
      case 'payment_method.attached':
        // Do nothing for now
        break;
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    return NextResponse.json({}, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Webhook error" }, { status: 500 });
  }
}
