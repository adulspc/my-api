/**
 * Request interception for matched routes (same role as legacy `middleware.ts` in Next.js 15;
 * Next.js 16+ uses the `proxy.ts` file and `export function proxy` name).
 */
import { type NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export function proxy(req: NextRequest) {
  const token =
    req.headers.get("Authorization")?.split(" ")[1] ??
    req.headers.get("authorization")?.split(" ")[1];

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const secret = process.env.JWT_SECRET;
  if (!secret) {
    return NextResponse.json({ error: "Server misconfiguration" }, { status: 500 });
  }

  try {
    jwt.verify(token, secret);
    return NextResponse.next();
  } catch {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
