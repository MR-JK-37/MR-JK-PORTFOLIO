import { NextResponse } from "next/server"

export async function GET() {
  try {
    if (!process.env.DATABASE_URL) {
      return NextResponse.json({ setup: false })
    }

    const { prisma } = await import("@/lib/prisma")

    const setup = await prisma.admin.findFirst()

    return NextResponse.json({ setup: !!setup })
  } catch (err) {
    return NextResponse.json({ setup: false })
  }
}
