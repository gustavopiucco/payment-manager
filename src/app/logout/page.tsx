'use client';

import { useEffect } from 'react';

export default function LogoutPage() {
  useEffect(() => {
    fetch('/api/logout', { method: 'GET' }).then(() => {
      window.location.href = '/login';
    });
  }, []);

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl p-6 shadow">
        <div className="text-center py-12 text-gray-900">
          <span role="img" aria-label="Success" className="text-4xl mr-2">🔒</span>
          Logging out...
        </div>
        <div className="mt-6 flex justify-center">
        </div>
      </div>
    </main>
  );
}