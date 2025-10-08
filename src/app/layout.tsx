import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import Header from "@/components/Header";
import { AuthProvider } from "@/context/AuthContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Payment Manager",
  description: "",
};

// This is a server component so we can use async/await and read cookies
export default async function RootLayout({ children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  let user = null;

  if (token) {
    try {
      const secret = process.env.JWT_SECRET;
      //TODO: use jose lib instead of jsonwebtoken for not block runtime event loop, and be able to use in the Vercel Edge Runtime
      user = jwt.verify(token, secret!);
    } catch {
      // invalid or expired token
      user = null;
    }
  }

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <Header />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
