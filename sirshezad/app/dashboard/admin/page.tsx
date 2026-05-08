import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { SignOutButton } from "@/components/sign-out-button"
import {
  Users, BookOpen, Settings, BarChart3, ShieldCheck,
  Bell, FileText, Calendar
} from "lucide-react"

export default async function AdminDashboardPage() {
  const session = await auth()
  if (!session?.user) redirect("/login")
  if (session.user.role !== "ADMIN") redirect("/login")

  return (
    <div className="min-h-screen bg-[#0a1128] text-white">
      {/* Top Bar */}
      <header className="h-16 border-b border-white/10 flex items-center justify-between px-8"
        style={{ background: "rgba(10,17,40,0.95)", backdropFilter: "blur(16px)" }}>
        <div className="flex items-center gap-3">
          <ShieldCheck className="w-6 h-6 text-[#f5b041]" />
          <span className="font-bold text-lg font-[var(--font-poppins)]">Admin Dashboard</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-[#94a3b8]">{session.user.email}</span>
          <span className="px-2 py-0.5 rounded-full bg-[#f5b041]/20 text-[#f5b041] text-xs font-semibold uppercase tracking-wider">
            Admin
          </span>
          <SignOutButton />
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-8 py-12">
        {/* Welcome */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold font-[var(--font-poppins)] mb-2">
            Welcome back, {session.user.name ?? "Admin"} 👋
          </h1>
          <p className="text-[#94a3b8]">Full system access — manage users, content, and settings.</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            { label: "Total Users", value: "—", icon: <Users className="w-5 h-5" />, color: "#f5b041" },
            { label: "Active Courses", value: "—", icon: <BookOpen className="w-5 h-5" />, color: "#60a5fa" },
            { label: "Reports", value: "—", icon: <BarChart3 className="w-5 h-5" />, color: "#34d399" },
            { label: "Pending Tasks", value: "—", icon: <Bell className="w-5 h-5" />, color: "#f87171" },
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
            { title: "User Management", desc: "Create, edit, and manage roles for all users.", icon: <Users className="w-6 h-6" /> },
            { title: "Content & Courses", desc: "Oversee all academic content and programmes.", icon: <BookOpen className="w-6 h-6" /> },
            { title: "System Settings", desc: "Configure application-wide settings.", icon: <Settings className="w-6 h-6" /> },
            { title: "Reports & Analytics", desc: "View system-wide reports and insights.", icon: <BarChart3 className="w-6 h-6" /> },
            { title: "Documents", desc: "Manage institutional documents.", icon: <FileText className="w-6 h-6" /> },
            { title: "Academic Calendar", desc: "Set key dates, exams, and events.", icon: <Calendar className="w-6 h-6" /> },
          ].map((m) => (
            <div key={m.title}
              className="rounded-2xl p-6 border border-white/10 cursor-pointer hover:border-[#f5b041]/40 transition-colors group"
              style={{ background: "rgba(21,34,67,0.4)" }}>
              <div className="w-10 h-10 rounded-xl bg-[#f5b041]/10 flex items-center justify-center text-[#f5b041] mb-4 group-hover:bg-[#f5b041]/20 transition-colors">
                {m.icon}
              </div>
              <h3 className="font-semibold mb-1">{m.title}</h3>
              <p className="text-sm text-[#94a3b8]">{m.desc}</p>
              <span className="inline-block mt-3 text-xs text-[#f5b041]/60 font-medium">Coming soon →</span>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
