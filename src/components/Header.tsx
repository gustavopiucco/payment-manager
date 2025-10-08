"use client";

import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, loading } = useAuth();

  // If loading, ensure mobile menu is closed
  if (loading && menuOpen) setMenuOpen(false);

  return (
    <header className="bg-white shadow-md sticky top-0 z-10">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-blue-600">
          Payment Manager
        </Link>

        {!loading && (
          <nav className="hidden md:flex gap-6">
            {user ? (
              <>
                <Link href="/logout" className="text-gray-700 hover:text-blue-600">
                  Logout
                </Link>
              </>
            ) : (
              <>
                <Link href="/login" className="text-gray-700 hover:text-blue-600">
                  Login
                </Link>
                <Link href="/register" className="text-gray-700 hover:text-blue-600">
                  Register
                </Link>
              </>
            )}
          </nav>
        )}

        {/* hide mobile menu button while loading */}
        {!loading && (
          <button
            className="md:hidden text-gray-700 focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {menuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        )}
      </div>

      {menuOpen && !loading && (
        <nav className="md:hidden bg-white border-t border-gray-200">
          {user ? (
            <>
              <Link
                href="/"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                onClick={() => setMenuOpen(false)}
              >
                Logout
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                onClick={() => setMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                href="/register"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                onClick={() => setMenuOpen(false)}
              >
                Register
              </Link>
            </>
          )}
        </nav>
      )}
    </header>
  );
}
