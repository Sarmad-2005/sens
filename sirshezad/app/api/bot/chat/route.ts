import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

function scoreDocument(content: string, query: string): number {
  const words = query.toLowerCase().split(/\s+/).filter(w => w.length > 2)
  const lower = content.toLowerCase()
  return words.reduce((total, word) => {
    const matches = (lower.match(new RegExp(word, "g")) || []).length
    return total + matches
  }, 0)
}

function extractRelevantSentences(content: string, query: string, maxSentences = 4): string {
  const sentences = content.split(/(?<=[.!?])\s+/)
  const queryWords = query.toLowerCase().split(/\s+/).filter(w => w.length > 2)
  
  const scored = sentences.map(s => ({
    text: s.trim(),
    score: queryWords.filter(w => s.toLowerCase().includes(w)).length,
  }))
  
  const relevant = scored
    .filter(s => s.score > 0 && s.text.length > 20)
    .sort((a, b) => b.score - a.score)
    .slice(0, maxSentences)
    .map(s => s.text)
  
  if (relevant.length > 0) return relevant.join(" ")
  // Fall back to first few sentences
  return sentences.filter(s => s.length > 20).slice(0, 2).join(" ")
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const message: string = body?.message?.trim()
    if (!message) return NextResponse.json({ reply: "Please type a message." })

    const [documents, rules] = await Promise.all([
      prisma.botDocument.findMany({ where: { active: true } }),
      prisma.botRule.findMany({ where: { active: true }, orderBy: { priority: "desc" } }),
    ])

    // Score all documents by relevance to the user's message
    const scored = documents
      .map(d => ({ doc: d, score: scoreDocument(d.content, message) }))
      .filter(x => x.score > 0)
      .sort((a, b) => b.score - a.score)

    let reply = ""

    // Check for greetings first
    const greetings = ["hi", "hello", "hey", "salam", "assalam", "good morning", "good afternoon", "good evening"]
    const isGreeting = greetings.some(g => message.toLowerCase().includes(g))

    if (scored.length > 0) {
      const best = scored[0].doc
      const extracted = extractRelevantSentences(best.content, message)
      reply = isGreeting
        ? `Asalam-o-Alaikum! Welcome to Riphah International College. ${extracted}`
        : extracted
    } else {
      // No matching documents — use the default rule or generic response
      const defaultRule = rules.find(r =>
        r.title.toLowerCase().includes("default") || r.priority === 0
      )
      if (isGreeting) {
        reply = "Asalam-o-Alaikum! Welcome to Riphah International College. How can I assist you today? You can ask me about our programs, admissions, fee structure, faculty, or events."
      } else {
        reply = defaultRule?.rule ||
          "Thank you for your question! For detailed information, please visit our website, use the contact form, or call our admissions office. We're happy to help!"
      }
    }

    // Append relevant page links based on topic
    const lower = message.toLowerCase()
    if (lower.includes("admission") || lower.includes("apply") || lower.includes("enroll")) {
      reply += " You can start your application at our [Admissions](/admissions) page."
    } else if (lower.includes("fee") || lower.includes("cost") || lower.includes("tuition") || lower.includes("payment")) {
      reply += " Check our [Fee Structure](/fee-structure) for full details."
    } else if (lower.includes("program") || lower.includes("course") || lower.includes("degree")) {
      reply += " Browse all our programs at the [Programs](/programs) page."
    } else if (lower.includes("contact") || lower.includes("phone") || lower.includes("email") || lower.includes("address")) {
      reply += " Reach us directly via our [Contact](/contact) page."
    }

    return NextResponse.json({ reply })
  } catch (error) {
    console.error("Chat API error:", error)
    return NextResponse.json(
      { reply: "I'm having trouble right now. Please try again in a moment." },
      { status: 500 }
    )
  }
}
