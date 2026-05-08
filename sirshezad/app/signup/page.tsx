"use client"

import { useCallback, useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { GraduationCap, Mail, ArrowLeft } from "lucide-react"
import { AuthCanvas } from "@/components/auth/auth-canvas"

export default function SignupPage() {
  const [formVisible, setFormVisible] = useState(false)

  const handleDrawComplete = useCallback(() => {
    setFormVisible(true)
  }, [])

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#0a1128] font-[var(--font-inter)]">
      {/* Ambient Glow */}
      <div className="absolute top-[-200px] right-[-100px] w-[600px] h-[600px] rounded-full opacity-40 blur-[100px] bg-[radial-gradient(circle,#f5b041_0%,transparent_70%)]" />
      <div className="absolute bottom-[-300px] left-[-200px] w-[800px] h-[800px] rounded-full opacity-40 blur-[100px] bg-[radial-gradient(circle,#2e4a8f_0%,transparent_70%)]" />

      {/* Canvas Animation */}
      <AuthCanvas formHeight={340} onDrawComplete={handleDrawComplete} />

      {/* Card */}
      <motion.div
        className="absolute bottom-4 right-4 w-full max-w-[460px] z-20"
        initial={{ opacity: 0, y: 20 }}
        animate={formVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.8, ease: [0.175, 0.885, 0.32, 1.275] }}
        style={{ pointerEvents: formVisible ? "auto" : "none" }}
      >
        <div className="backdrop-blur-2xl bg-[rgba(21,34,67,0.65)] border border-[rgba(245,176,65,0.3)] rounded-[20px] p-10 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.1)]">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-11 h-11 bg-gradient-to-br from-[#f5b041] to-[#d68910] rounded-xl mb-3">
              <GraduationCap className="w-6 h-6 text-[#0a1128]" />
            </div>
            <h2 className="font-[var(--font-poppins)] text-2xl font-bold text-white mb-1">
              Create Account
            </h2>
            <p className="text-[#94a3b8] text-sm">
              Self-registration is not available yet
            </p>
          </div>

          {/* Notice */}
          <div className="rounded-xl border border-[#f5b041]/20 bg-[#f5b041]/5 p-5 mb-6 text-center">
            <p className="text-[#e2e8f0] text-sm leading-relaxed mb-3">
              Accounts are created by the administrator. If you are a new
              faculty member or staff, please contact:
            </p>
            <a
              href="mailto:admin@ric.edu.pk"
              className="inline-flex items-center gap-2 text-[#f5b041] font-semibold text-sm hover:underline"
            >
              <Mail className="w-4 h-4" />
              admin@ric.edu.pk
            </a>
          </div>

          <Link
            href="/login"
            className="w-full flex items-center justify-center gap-2 py-3 bg-[#f5b041] text-[#0a1128] font-[var(--font-poppins)] text-base font-bold rounded-lg hover:bg-[#f39c12] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Login
          </Link>
        </div>
      </motion.div>
    </div>
  )
}

