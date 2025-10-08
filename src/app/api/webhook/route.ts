import client from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: NextRequest) {
  try {
    const signature = req.headers.get("stripe-signature");
    const rawBody = await req.text();
    let event;
    let data;

    try {
      event = Stripe.webhooks.constructEvent(
        rawBody,
        signature!,
        process.env.STRIPE_ENDPOINT_SECRET!
      );
      data = event.data.object;
    } catch (err) {
      console.error("Webhook signature verification failed", err);
      return NextResponse.json({ error: "Webhook error" }, { status: 400 });
    }

    const db = await client.connect();
    await db
      .db("payment-manager")
      .collection("webhooks")
      .insertOne(data);

    switch (event.type) {
      case 'payment_intent.succeeded':
        console.log(data);
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
