"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "../components/Header";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (password !== confirm) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok || data?.success === false) {
        throw new Error(data?.error || `HTTP ${res.status}`);
      }

      setSuccess(true);
      setName("");
      setEmail("");
      setPassword("");
      setConfirm("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed");
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
            Register
          </h1>

          {success ? (
            <div className="text-center">
              <p className="text-green-600 font-medium text-lg">Registration successful!</p>
              <p className="mt-2 text-sm text-gray-700">
                You can now <a href="/login" className="text-blue-600 hover:underline">sign in</a> with your new account.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-gray-800">
              <label className="block">
                <span className="text-sm text-gray-700">Full name</span>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2 text-gray-800 placeholder-gray-500 outline-none focus:ring-2 focus:ring-blue-600"
                  placeholder=""
                />
              </label>

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

              <label className="block">
                <span className="text-sm text-gray-700">Confirm password</span>
                <input
                  type="password"
                  required
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2 text-gray-800 placeholder-gray-500 outline-none focus:ring-2 focus:ring-blue-600"
                  placeholder=""
                />
              </label>

              {loading ? (
                <p className="text-center text-gray-900">Creating account…</p>
              ) : error ? (
                <p className="text-center text-red-600">{error}</p>
              ) : null}

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-2 inline-block px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition disabled:opacity-60"
              >
                Register
              </button>
            </form>
          )}

          <p className="text-sm text-gray-700 text-center mt-4">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-600 hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </main>
    </>
  );
}
