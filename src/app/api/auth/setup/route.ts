import { NextResponse } from "next/server"
import { prisma } from "../../../../lib/prisma"
import bcrypt from "bcryptjs"

export async function POST(req: Request) {
  const body = await req.json()

  const hashed = await bcrypt.hash(body.secret, 10)

  await prisma.admin.create({
    data: {
      username: "admin",
      password_hash: hashed,
    },
  })

  return NextResponse.json({ success: true })
}
