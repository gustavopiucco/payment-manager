import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { JwtPayload } from "@/types/jwt";

export async function getAuthUser(): Promise<JwtPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) return null;

  const secret = process.env.JWT_SECRET;
  if (!secret) return null;

  try {
    //TODO: use jose lib instead of jsonwebtoken for not block runtime event loop, and be able to use in the Vercel Edge Runtime
    const payload = jwt.verify(token, secret) as JwtPayload;
    return payload;
  } catch {
    // invalid or expired token
    return null;
  }
}