"use client";

import { useState } from "react";
import Link from "next/link";

export default function ChangePasswordPage() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!oldPassword || !newPassword || !confirmPassword) {
      setError("Please fill in all fields");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("New password and confirmation do not match");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ oldPassword, newPassword }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data?.error || `HTTP ${res.status}`);
      }

      setSuccess(data?.message || "Password changed successfully");
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to change password");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gray-100 p-8 flex items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-2xl shadow p-6 hover:shadow-lg transition">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Change Password
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4 text-gray-800">
          <label className="block">
            <span className="text-sm text-gray-700">Old Password</span>
            <input
              type="password"
              required
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2 text-gray-800 placeholder-gray-500 outline-none focus:ring-2 focus:ring-blue-600"
            />
          </label>

          <label className="block">
            <span className="text-sm text-gray-700">New Password</span>
            <input
              type="password"
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2 text-gray-800 placeholder-gray-500 outline-none focus:ring-2 focus:ring-blue-600"
            />
          </label>

          <label className="block">
            <span className="text-sm text-gray-700">Confirm New Password</span>
            <input
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2 text-gray-800 placeholder-gray-500 outline-none focus:ring-2 focus:ring-blue-600"
            />
          </label>

          {loading ? (
            <p className="text-center text-gray-900">Sending…</p>
          ) : error ? (
            <p className="text-center text-red-600">{error}</p>
          ) : success ? (
            <p className="text-center text-green-600">{success}</p>
          ) : null}

          <div className="flex justify-end">
            <Link href="/" className="text-sm text-blue-600 hover:underline">
              Back to Home
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 inline-block px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition disabled:opacity-60"
          >
            Change Password
          </button>
        </form>
      </div>
    </main>
  );
}
