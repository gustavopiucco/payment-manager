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
    const payload = jwt.verify(token, secret) as JwtPayload;
    return payload;
  } catch (err) {
    // invalid or expired token
    return null;
  }
}