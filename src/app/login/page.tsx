"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Header from "../components/Header";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok || data?.success === false) {
        throw new Error(data?.error || `HTTP ${res.status}`);
      }

      router.push("/");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Header />

      <main className="min-h-screen bg-gray-100 p-8 flex items-center justify-center">
        <div className="w-full max-w-md bg-white rounded-2xl shadow p-6 hover:shadow-lg transition">
          <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
            Login
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4 text-gray-800">
            <label className="block">
              <span className="text-sm text-gray-700">Email</span>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2 text-gray-800 placeholder-gray-500 outline-none focus:ring-2 focus:ring-blue-600"
                placeholder=""
              />
            </label>

            <label className="block">
              <span className="text-sm text-gray-700">Password</span>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2 text-gray-800 placeholder-gray-500 outline-none focus:ring-2 focus:ring-blue-600"
                placeholder=""
              />
            </label>

            {loading ? (
              <p className="text-center text-gray-900">Signing in…</p>
            ) : error ? (
              <p className="text-center text-red-600">{error}</p>
            ) : null}

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 inline-block px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition disabled:opacity-60"
            >
              Login
            </button>
          </form>

          <p className="text-sm text-gray-700 text-center mt-4">
            Don’t have an account?{" "}
            <Link href="/register" className="text-blue-600 hover:underline">
              Register
            </Link>
          </p>
        </div>
      </main>
    </>
  );
}
