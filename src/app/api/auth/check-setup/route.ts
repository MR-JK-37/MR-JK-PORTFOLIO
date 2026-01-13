import { NextResponse } from "next/server"
import { prisma } from "../../../../lib/prisma"

export async function GET() {
  try {
    const setup = await prisma.admin.findFirst()
    return NextResponse.json({ setup: !!setup })
  } catch (err) {
    return NextResponse.json({ setup: false }, { status: 500 })
  }
}
