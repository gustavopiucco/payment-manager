"use client";

import AvailableProducts from "@/components/AvailableProducts";
import MyProducts from "@/components/MyProducts";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

export default function HomePage() {
  const { user } = useAuth();

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      {user && (
        <>
          <h3 className="font-bold text-gray-800">
            Hello, {user?.name}
          </h3>
          <p className="text-gray-800">
            {user?.email} <br />
          </p>
          <Link
            href="/change-password"
            className="mt-2 inline-block px-2 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Change Password
          </Link>
        </>
      )}

      {user !== null && <MyProducts />}
      <AvailableProducts />
    </main>
  );
}
