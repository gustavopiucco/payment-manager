"use client";

import { useRouter } from "next/navigation";

export default function OrderSuccessPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl p-6 shadow">
        <div className="text-center py-12 text-gray-900">
          <span role="img" aria-label="Success" className="text-4xl mr-2">✅</span>
          Payment Successful
        </div>
        <div className="mt-6 flex justify-center">
          <button
            onClick={() => router.push("/")}
            className="px-6 py-2 bg-gray-300 text-gray-900 rounded-xl hover:bg-gray-400 transition"
          >
            Back to Home
          </button>
        </div>
      </div>
    </main>
  );
}