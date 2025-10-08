"use client";

import AvailableProducts from "@/components/AvailableProducts";
import MyProducts from "@/components/MyProducts";
import { useAuth } from "@/context/AuthContext";

export default function HomePage() {
  const { user } = useAuth();

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      {user && (
        <>
          <h3 className="font-bold mt-8 text-gray-800">
            Hello, {user?.name}
          </h3>
          <p className="text-gray-800">
            {user?.email} <br />
          </p>
        </>
      )}

      {user !== null && <MyProducts />}
      <AvailableProducts />
    </main>
  );
}
