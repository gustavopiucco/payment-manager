import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import client from "../../../lib/mongodb";
import { Product } from "@/types/product";
import { ObjectId } from "mongodb";;
import { getAuthUser } from "@/utils/auth";

export async function POST(req: NextRequest) {
  try {
    const authUser = await getAuthUser();

    if (!authUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { productId } = (await req.json()) as { productId: string };

    const db = await client.connect();

    const product = await db
      .db("payment-manager")
      .collection<Product>("products")
      .findOne({ _id: new ObjectId(productId) });

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    //const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: "2025-09-30.clover" });

    // const session = await stripe.checkout.sessions.create({
    //   mode: 'payment',
    //   payment_method_types: ['card'],
    //   client_reference_id: "test_user_identifier", // TODO: replace with actual user identifier
    //   line_items: [
    //     {
    //       price_data: {
    //         currency: "eur",
    //         product_data: {
    //           name: product.name,
    //           images: product.image ? [product.image] : undefined,
    //         },
    //         unit_amount: Math.round(product.price * 100),
    //       },
    //       quantity: 1,
    //     },
    //   ],

    //   success_url: `${process.env.NEXT_PUBLIC_APP_URL}/order/success`,
    //   cancel_url: process.env.NEXT_PUBLIC_APP_URL,
    //   allow_promotion_codes: false,
    //   automatic_tax: { enabled: false },
    // });

    return NextResponse.json({ url: "https://www.google.com" }, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Checkout failed" }, { status: 500 });
  }
}
