"use client"

import { useState, useCallback } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Eye, EyeOff, GraduationCap } from "lucide-react"
import { signIn } from "next-auth/react"
import { AuthCanvas } from "@/components/auth/auth-canvas"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [authError, setAuthError] = useState("")
  const [authSuccess, setAuthSuccess] = useState(false)
  const [formVisible, setFormVisible] = useState(false)

  const handleDrawComplete = useCallback(() => {
    setFormVisible(true)
  }, [])

  const handleGoogleSignIn = () => {
    signIn("google", { callbackUrl: "/dashboard" })
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setAuthError("")
    setAuthSuccess(false)
    setIsLoading(true)

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      })

      if (result?.error) {
        setAuthError("Invalid email or password.")
      } else {
        setAuthSuccess(true)
        // Middleware will redirect to role-specific dashboard
        router.push("/dashboard")
      }
    } catch {
      setAuthError("An unexpected error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#0a1128] font-[var(--font-inter)]">
      {/* Ambient Glow */}
      <div className="absolute top-[-200px] right-[-100px] w-[600px] h-[600px] rounded-full opacity-40 blur-[100px] bg-[radial-gradient(circle,#f5b041_0%,transparent_70%)]" />
      <div className="absolute bottom-[-300px] left-[-200px] w-[800px] h-[800px] rounded-full opacity-40 blur-[100px] bg-[radial-gradient(circle,#2e4a8f_0%,transparent_70%)]" />

      {/* Canvas Animation */}
      <AuthCanvas formHeight={480} onDrawComplete={handleDrawComplete} />

      {/* Auth Form */}
      <motion.div
        className="absolute bottom-4 right-4 w-full max-w-[460px] z-20"
        initial={{ opacity: 0, y: 20 }}
        animate={formVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{
          duration: 0.8,
          ease: [0.175, 0.885, 0.32, 1.275],
        }}
        style={{ pointerEvents: formVisible ? "auto" : "none" }}
      >
        <div className="backdrop-blur-2xl bg-[rgba(21,34,67,0.65)] border border-[rgba(245,176,65,0.3)] rounded-[20px] p-10 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.1)]">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-11 h-11 bg-gradient-to-br from-[#f5b041] to-[#d68910] rounded-xl mb-3">
              <GraduationCap className="w-6 h-6 text-[#0a1128]" />
            </div>
            <h2 className="font-[var(--font-poppins)] text-2xl font-bold text-white mb-1">
              Student Portal
            </h2>
            <p className="text-[#94a3b8] text-sm">
              Sign in to access your dashboard
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            {/* Email */}
            <div className="text-left">
              <label className="block text-sm font-medium text-[#e2e8f0] mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                placeholder="student@riphah.edu.pk"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 bg-[rgba(10,17,40,0.5)] border border-white/10 rounded-lg text-white text-[0.95rem] transition-all focus:outline-none focus:border-[#f5b041] focus:shadow-[0_0_0_3px_rgba(245,176,65,0.2)] focus:bg-[rgba(10,17,40,0.8)] placeholder:text-[#475569]"
              />
            </div>

            {/* Password */}
            <div className="text-left">
              <label className="block text-sm font-medium text-[#e2e8f0] mb-1.5">
                Password
              </label>
              <div className="relative flex items-center">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 pr-10 bg-[rgba(10,17,40,0.5)] border border-white/10 rounded-lg text-white text-[0.95rem] transition-all focus:outline-none focus:border-[#f5b041] focus:shadow-[0_0_0_3px_rgba(245,176,65,0.2)] focus:bg-[rgba(10,17,40,0.8)] placeholder:text-[#475569]"
                />
                <button
                  type="button"
                  className="absolute right-3 flex items-center justify-center text-[#94a3b8] hover:text-[#f5b041] transition-colors bg-transparent border-none p-0 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? (
                    <EyeOff className="w-[18px] h-[18px]" />
                  ) : (
                    <Eye className="w-[18px] h-[18px]" />
                  )}
                </button>
              </div>
            </div>

            {authError && (
              <p className="text-red-500 text-sm text-center mt-2">{authError}</p>
            )}
            {authSuccess && (
              <p className="text-emerald-500 text-sm text-center mt-2">
                Authentication successful! Redirecting...
              </p>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 mt-2 bg-[#f5b041] text-[#0a1128] font-[var(--font-poppins)] text-base font-bold rounded-lg hover:bg-[#f39c12] hover:-translate-y-0.5 active:translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none transition-all cursor-pointer"
            >
              {isLoading ? "Authenticating..." : "Sign In"}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center text-center my-6 text-[#94a3b8] text-sm">
            <span className="flex-1 border-b border-white/10" />
            <span className="px-3">or continue with</span>
            <span className="flex-1 border-b border-white/10" />
          </div>

          {/* OAuth */}
          <div className="flex gap-4">
            <button
              type="button"
              onClick={handleGoogleSignIn}
              className="flex-1 flex items-center justify-center gap-2 py-3 bg-white/5 border border-white/10 rounded-lg text-[#e2e8f0] text-sm hover:bg-white/10 transition-all cursor-pointer"
            >
              <svg width="18" height="18" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              Continue with Google
            </button>
          </div>

          {/* Footer */}
          <div className="text-center mt-6 text-sm text-[#94a3b8]">
            Don&apos;t have an account?{" "}
            <Link
              href="/signup"
              className="text-[#f5b041] font-semibold hover:underline"
            >
              Sign up
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
