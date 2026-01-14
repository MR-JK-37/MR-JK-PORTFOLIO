import { NextResponse } from "next/server"
import { prisma } from "../../../../lib/prisma"

export async function PUT(req: Request, { params }: any) {
  const body = await req.json()

  const item = await prisma.item.update({
    where: { id: Number(params.id) },
    data: body,
  })

  return NextResponse.json(item)
}

export async function DELETE(_: Request, { params }: any) {
  await prisma.item.delete({
    where: { id: Number(params.id) },
  })

  return NextResponse.json({ ok: true })
}
