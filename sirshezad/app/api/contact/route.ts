import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@/auth"

export async function GET() {
  const session = await auth()
  if (!session) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 })
  }
  const submissions = await prisma.contactSubmission.findMany({
    orderBy: { createdAt: "desc" },
  })
  return NextResponse.json(submissions)
}

export async function POST(req: Request) {
  const body = await req.json()
  const { name, email, phone, subject, message } = body
  if (!name || !email || !subject || !message) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
  }
  const submission = await prisma.contactSubmission.create({
    data: { name, email, phone: phone ?? "", subject, message },
  })
  return NextResponse.json(submission, { status: 201 })
}
