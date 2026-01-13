import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"   // ✅ TOP LEVEL

export async function GET() {
  try {
    const setup = await prisma.admin.findFirst()
    return NextResponse.json({ setup: !!setup })
  } catch (e) {
    return NextResponse.json({ setup: false }, { status: 500 })
  }
}
