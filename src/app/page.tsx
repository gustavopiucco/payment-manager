"use client";

import Image from "next/image";


type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
};

const products: Product[] = [
  {
    id: 1,
    name: "Gaming Laptop",
    price: 900,
    image: "/images/notebook.jpg",
  },
  {
    id: 2,
    name: "Smartphone",
    price: 450,
    image: "/images/smartphone.jpg",
  },
  {
    id: 3,
    name: "Bluetooth Headset",
    price: 70,
    image: "/images/fone.jpg",
  },
  {
    id: 4,
    name: "Tablet",
    price: 240,
    image: "/images/tablet.jpg",
  },
  {
    id: 5,
    name: "Smartwatch",
    price: 160,
    image: "/images/smartwatch.jpg",
  },
  {
    id: 6,
    name: "Digital Camera",
    price: 300,
    image: "/images/camera.jpg",
  },
  {
    id: 7,
    name: "Printer",
    price: 120,
    image: "/images/impressora.jpg",
  },
  {
    id: 8,
    name: "Monitor",
    price: 180,
    image: "/images/monitor.jpg",
  },
];

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
            <Image
              src={product.image}
              alt={product.name}
              width={300}
              height={200}
              className="rounded-md"
            />
            <h2 className="mt-4 text-lg font-semibold">{product.name}</h2>
            <p className="text-gray-600">€ {product.price.toFixed(2)}</p>
            <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition">
              Buy
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}
