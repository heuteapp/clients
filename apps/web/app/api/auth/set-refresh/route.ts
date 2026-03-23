import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { refreshToken } = await req.json();

  if (!refreshToken) {
    return NextResponse.json({ error: "Refresh token is required" }, { status: 400 });
  }

  const res = NextResponse.json({ success: true });

  res.cookies.set("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 24 * 30, // 30 days
  });

  return res;
}