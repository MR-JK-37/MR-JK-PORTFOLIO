import { NextResponse } from "next/server"
import { prisma } from "../../../../lib/prisma"

export async function GET() {
  const setup = await prisma.admin.findFirst()
  return NextResponse.json({ setup: !!setup })
}
