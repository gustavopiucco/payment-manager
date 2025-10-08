"use client";

import AvailableProducts from "@/components/AvailableProducts";
import MyProducts from "@/components/MyProducts";
import { useAuth } from "@/context/AuthContext";

export default function HomePage() {
  const { user, loading } = useAuth();

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      {user !== null && <MyProducts />}
      <AvailableProducts />
    </main>
  );
}
