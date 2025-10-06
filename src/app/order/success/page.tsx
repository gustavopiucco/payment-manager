"use client";

import React, { Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import { Product } from "../types/product";

function CheckoutContent() {
  const params = useSearchParams();
  const router = useRouter();

  // Read `id` from the query string (?id=123)
  const id = params.get("id");

  // State: the loaded product (or null while missing)
  const [product, setProduct] = useState<Product | null>(null);

  // Loading state: start as `true` only when we already have an `id` so the UI
  // shows a "Loading product…" message immediately while the request runs.
  const [loading, setLoading] = useState<boolean>(!!id);

  // Error message (if fetch fails)
  const [error, setError] = useState<string | null>(null);

  // Effect: fetch the product whenever the `id` changes
  useEffect(() => {
    async function load() {
      setLoading(true);
      setError(null);

      try {
        // If there is no id, we don't attempt to fetch
        if (!id) throw new Error("No Product ID specified");

        const res = await fetch(`/api/products/${id}`);
        if (!res.ok) {
          // Map 404 to a friendly message
          if (res.status === 404) throw new Error("Product not found");
          throw new Error(`Request failed: ${res.status}`);
        }
        const data = await res.json();
        setProduct(data as Product);
      } catch (err) {
        // Show a user-friendly error message
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Failed to load product");
        }
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [id]);

  async function handleConfirm() {
    if (!product) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/stripe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: product.id }),
      });

      if (!res.ok) {
        throw new Error("Failed to create order");
      }

      const data = await res.json();

      if (data.url) {
        // Redirect to Stripe Checkout (window.location.href for external URL, because router.push only works in the the React tree)
        window.location.href = data.url;
      } else {
        throw new Error("Invalid response from server");
      }
    }
    catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Failed to create order");
      }
    }
  }

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl p-6 shadow">
        <div className="text-center py-12 text-gray-900">
          <span role="img" aria-label="Success" className="text-4xl mr-2">✅</span>
          Payment Successful
        </div>
      </div>
    </main>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={null}>
      {/* Checkout content shows once useSearchParams is resolved using React Suspense component */}
      <CheckoutContent />
    </Suspense>
  );
}
