import { NextResponse } from "next/server"

export async function GET(req: Request) {
  const cookie = req.headers.get("cookie") || ""
  const isAdmin = cookie.includes("mrjk_session=true")

  return NextResponse.json({ isAdmin })
}
