import NextAuth from "next-auth"
import { NextResponse } from "next/server"
import { authConfig } from "./auth.config"
import { evaluatePolicy, getDashboardRoute } from "@/lib/rbac"

// Use edge-compatible authConfig (no Prisma adapter) for the proxy
const { auth } = NextAuth(authConfig)

export const proxy = auth((req) => {
  const session = req.auth
  const { pathname } = req.nextUrl
  const isAuthenticated = !!session?.user

  const isProtectedRoute = pathname.startsWith("/dashboard")
  const isAuthRoute = pathname === "/login" || pathname === "/signup"

  // Already logged in → redirect away from login/signup
  if (isAuthRoute && isAuthenticated) {
    const role = session!.user.role as string
    return NextResponse.redirect(new URL(getDashboardRoute(role), req.nextUrl))
  }

  // Not logged in → redirect to login, preserve destination
  if (isProtectedRoute && !isAuthenticated) {
    const loginUrl = new URL("/login", req.nextUrl)
    loginUrl.searchParams.set("callbackUrl", pathname)
    return NextResponse.redirect(loginUrl)
  }

  // RBAC: role not authorised for this route → send to their own dashboard
  if (isProtectedRoute && isAuthenticated) {
    const role = session!.user.role as string
    if (!evaluatePolicy(role, pathname)) {
      return NextResponse.redirect(
        new URL(getDashboardRoute(role), req.nextUrl)
      )
    }
  }

  return NextResponse.next()
})

export const config = {
  // Skip Next.js internals, static assets, and NextAuth API routes
  matcher: [
    "/((?!api/auth|_next/static|_next/image|favicon\\.ico|.*\\.(?:png|jpg|jpeg|svg|ico|webp)).*)",
  ],
}
