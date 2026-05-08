import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { SignOutButton } from "@/components/sign-out-button"
import {
  CreditCard, FileText, Receipt, BarChart3,
  Bell, Download, Users, TrendingUp
} from "lucide-react"

export default async function AccountantDashboardPage() {
  const session = await auth()
  if (!session?.user) redirect("/login")
  if (session.user.role !== "ACCOUNTANT") redirect("/login")

  return (
    <div className="min-h-screen bg-[#0a1128] text-white">
      {/* Top Bar */}
      <header className="h-16 border-b border-white/10 flex items-center justify-between px-8"
        style={{ background: "rgba(10,17,40,0.95)", backdropFilter: "blur(16px)" }}>
        <div className="flex items-center gap-3">
          <CreditCard className="w-6 h-6 text-[#34d399]" />
          <span className="font-bold text-lg font-[var(--font-poppins)]">Accountant Dashboard</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-[#94a3b8]">{session.user.email}</span>
          <span className="px-2 py-0.5 rounded-full bg-[#34d399]/20 text-[#34d399] text-xs font-semibold uppercase tracking-wider">
            Accountant
          </span>
          <SignOutButton />
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-8 py-12">
        {/* Welcome */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold font-[var(--font-poppins)] mb-2">
            Welcome back, {session.user.name ?? "Accountant"} 👋
          </h1>
          <p className="text-[#94a3b8]">Manage fee records, payments, and financial reports.</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            { label: "Fees Collected", value: "—", icon: <TrendingUp className="w-5 h-5" />, color: "#34d399" },
            { label: "Pending Dues", value: "—", icon: <Receipt className="w-5 h-5" />, color: "#f87171" },
            { label: "Students", value: "—", icon: <Users className="w-5 h-5" />, color: "#60a5fa" },
            { label: "Notifications", value: "—", icon: <Bell className="w-5 h-5" />, color: "#f5b041" },
          ].map((s) => (
            <div key={s.label}
              className="rounded-2xl p-6 border border-white/10"
              style={{ background: "rgba(21,34,67,0.6)" }}>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[#94a3b8] text-sm">{s.label}</span>
                <span style={{ color: s.color }}>{s.icon}</span>
              </div>
              <p className="text-2xl font-bold text-white">{s.value}</p>
            </div>
          ))}
        </div>

        {/* Placeholder modules */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: "Fee Collection", desc: "Record and track student fee payments.", icon: <CreditCard className="w-6 h-6" /> },
            { title: "Pending Dues", desc: "View and follow up on outstanding fees.", icon: <Receipt className="w-6 h-6" /> },
            { title: "Financial Reports", desc: "Generate monthly and annual reports.", icon: <BarChart3 className="w-6 h-6" /> },
            { title: "Student Ledger", desc: "Full payment history per student.", icon: <FileText className="w-6 h-6" /> },
            { title: "Export Data", desc: "Export records to Excel / PDF.", icon: <Download className="w-6 h-6" /> },
            { title: "Scholarships", desc: "Manage scholarship deductions.", icon: <Users className="w-6 h-6" /> },
          ].map((m) => (
            <div key={m.title}
              className="rounded-2xl p-6 border border-white/10 cursor-pointer hover:border-[#34d399]/40 transition-colors group"
              style={{ background: "rgba(21,34,67,0.4)" }}>
              <div className="w-10 h-10 rounded-xl bg-[#34d399]/10 flex items-center justify-center text-[#34d399] mb-4 group-hover:bg-[#34d399]/20 transition-colors">
                {m.icon}
              </div>
              <h3 className="font-semibold mb-1">{m.title}</h3>
              <p className="text-sm text-[#94a3b8]">{m.desc}</p>
              <span className="inline-block mt-3 text-xs text-[#34d399]/60 font-medium">Coming soon →</span>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
