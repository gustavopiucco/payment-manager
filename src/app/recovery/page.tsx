"use client";

import { useState } from "react";
import Link from "next/link";

export default function RecoveryPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    try {
      const res = await fetch("/api/recover", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data?.error || `HTTP ${res.status}`);
      }

      if (data?.message) {
        setSuccess(String(data.message));
      } else {
        setSuccess("If that email exists, a recovery link has been sent.");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Request failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gray-100 p-8 flex items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-2xl shadow p-6 hover:shadow-lg transition">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Password recovery
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

          {loading ? (
            <p className="text-center text-gray-900">Loading...</p>
          ) : error ? (
            <p className="text-center text-red-600">{error}</p>
          ) : success ? (
            <p className="text-center text-green-600 break-words">{success}</p>
          ) : null}

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 inline-block px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition disabled:opacity-60"
          >
            Send recovery email
          </button>
        </form>

        <p className="text-sm text-gray-700 text-center mt-4">
          Remembered your password?{" "}
          <Link href="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </main>
  );
}
