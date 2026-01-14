import { NextResponse } from "next/server"
import { prisma } from "../../../../lib/prisma"
import bcrypt from "bcryptjs"

export async function POST(req: Request) {
  const body = await req.json()

  const admin = await prisma.admin.findFirst({
    where: { username: "admin" },
  })

  if (!admin) {
    return NextResponse.json({ error: "Invalid login" }, { status: 401 })
  }

  const ok = await bcrypt.compare(body.secret, admin.password_hash)

  if (!ok) {
    return NextResponse.json({ error: "Invalid login" }, { status: 401 })
  }

  return NextResponse.json({ success: true })
}
