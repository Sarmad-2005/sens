import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@/auth"

export async function GET() {
  const programs = await prisma.program.findMany({
    where: { active: true },
    orderBy: [{ category: "asc" }, { createdAt: "asc" }],
  })
  return NextResponse.json(programs)
}

export async function POST(req: Request) {
  const session = await auth()
  if (!session) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 })
  }
  const body = await req.json()
  const program = await prisma.program.create({ data: body })
  return NextResponse.json(program, { status: 201 })
}
