"use client";

import React, { Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import products, { Product } from "../../../lib/products";
import Image from "next/image";

// this component uses useSearchParams and useRouter, so it needs to be wrapped in <Suspense>
function CheckoutContent() {
  const params = useSearchParams();
  const router = useRouter();

  // grab product id from query string (?id=1 for example)
  const id = params.get("id");
  const product = products.find((p: Product) => String(p.id) === id);

  // if product not found, show simple error page
  if (!product) {
    return (
      <main className="min-h-screen bg-gray-100 p-8">
        <h1 className="text-2xl font-bold">Product not found</h1>
      </main>
    );
  }

  function handleConfirm() {
    alert(`Order placed for ${product!.name} — €${product!.price.toFixed(2)}`);
    router.push("/");
  }

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl p-6 shadow">
        <h1 className="text-2xl font-bold mb-4 text-gray-900">Checkout</h1>
        <div className="flex gap-4 items-center">
          {/* product image */}
          <div className="w-32 h-32 relative bg-gray-50 rounded-md overflow-hidden">
            <Image
              src={product.image}
              alt={product.name}
              fill
              style={{ objectFit: "contain" }}
              unoptimized
            />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">{product.name}</h2>
            <p className="text-gray-600">€ {product.price.toFixed(2)}</p>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={handleConfirm}
            className="px-6 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition"
          >
            Confirm Purchase
          </button>
        </div>
      </div>
    </main>
  );
}

// main page component
export default function CheckoutPage() {
  return (
    <Suspense fallback={null}>
      {/* real content shows once useSearchParams is resolved */}
      <CheckoutContent />
    </Suspense>
  );
}
