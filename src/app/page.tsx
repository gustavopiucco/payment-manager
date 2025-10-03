"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

// TypeScript type for Product, helps to keep data consistent
type Product = {
  id?: string;
  _id?: string;
  name: string;
  price: number;
  image: string;
};

export default function HomePage() {
  // State that keeps the products list
  const [products, setProducts] = useState<Product[]>([]);

  // State that says if we are loading data
  const [loading, setLoading] = useState(true);

  // State that keeps an error message (if something goes wrong)
  const [error, setError] = useState<string | null>(null);

  // useEffect runs after the page loads, only once
  useEffect(() => {
    // flag to avoid updating state after unmount
    let mounted = true;

    // async function to load products from API
    async function load() {
      try {
        // call backend API endpoint
        const res = await fetch('/api/products');

        // if backend responds with error (like 500 or 404)
        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        // get the data as JSON
        const data = await res.json();

        // update state only if still mounted
        if (mounted) setProducts(data);
      } catch (error) {
        // log the error for debug
        console.error('Failed to load products', error);

        // show error message on screen
        if (mounted) setError(error instanceof Error ? error.message : String(error));
      } finally {
        // loading finished (error or success)
        if (mounted) setLoading(false);
      }
    }

    // run the loader when component starts
    load();

    // cleanup: mark as unmounted when component is destroyed
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      {/* Page title */}
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Available Products
      </h1>

      {/* If still loading, show message */}
      {loading ? (
        <p className="text-center text-gray-900">Loading products…</p>
      ) : error ? (
        // If error, show the error message
        <p className="text-center text-red-600">{error}</p>
      ) : (
        // Else, show the grid with all products
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {products.map((product) => (
            // Each product card
            <div
              key={product.id ?? product._id}
              className="bg-white rounded-2xl shadow p-4 flex flex-col items-center hover:shadow-lg transition"
            >
              {/* Product image */}
              <div className="w-full h-48 relative rounded-md overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 300px"
                  style={{ objectFit: "contain" }}
                  className="object-contain"
                  unoptimized
                />
              </div>

              {/* Product name */}
              <h2 className="mt-4 text-lg font-semibold text-gray-800">{product.name}</h2>

              {/* Product price with 2 decimals */}
              <p className="text-gray-600">€ {product.price.toFixed(2)}</p>

              {/* Link to checkout with product id */}
              <Link
                href={`/checkout?id=${product.id ?? product._id}`}
                className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
              >
                Buy
              </Link>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
