"use client";

import Image from "next/image";
import Link from "next/link";
import products from "../../lib/products";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Available Products
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-2xl shadow p-4 flex flex-col items-center hover:shadow-lg transition"
          >
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
            <h2 className="mt-4 text-lg font-semibold text-gray-800">{product.name}</h2>
            <p className="text-gray-600">€ {product.price.toFixed(2)}</p>
            <Link
              href={`/checkout?id=${product.id}`}
              className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
            >
              Buy
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
}
