import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import client from "../../../../lib/mongodb";
import { Product } from "@/app/types/product";
import { ObjectId } from "mongodb";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: "2025-09-30.clover" });

export async function POST(req: NextRequest) {
  try {
    const token = req.cookies.get('token')?.value;
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized', redirect: '/login' }, { status: 401 });
    }

    const { productId } = (await req.json()) as { productId: string };

    const db = await client.connect();

    const product = await db
      .db("payment-manager")
      .collection<Product>("products")
      .findOne({ _id: new ObjectId(productId) });

    //TODO: get user from token, check if user exists, and get thaat user data

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      client_reference_id: "test_user_identifier", // TODO: replace with actual user identifier
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: product.name,
              images: product.image ? [product.image] : undefined,
            },
            unit_amount: Math.round(product.price * 100),
          },
          quantity: 1,
        },
      ],

      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/order/success`,
      cancel_url: process.env.NEXT_PUBLIC_APP_URL,
      allow_promotion_codes: false,
      automatic_tax: { enabled: false },
    });

    /* const paymentLink = await stripe.paymentLinks.create({
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: product.name,
              images: product.image ? [product.image] : undefined,
            },
            unit_amount: Math.round(product.price * 100),
          },
          quantity: 1,
        },
      ],
      after_completion: {
        type: "redirect",
        redirect: {
          url: `${process.env.NEXT_PUBLIC_APP_URL}/order/success`,
        },
      },
      allow_promotion_codes: true,
      automatic_tax: { enabled: false },
    }); */

    return NextResponse.json({ url: paymentLink.url }, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Fail to create Stripe Payment Link" }, { status: 500 });
  }
}
