import type { NextAuthConfig } from "next-auth"
import Google from "next-auth/providers/google"

/**
 * Edge-compatible NextAuth config.
 * No database / Node.js-only imports here — this file runs in the
 * Edge Runtime (middleware) AND as the base for auth.ts (Node runtime).
 */
export const authConfig = {
  pages: {
    signIn: "/login",
    error: "/login",
  },
  // Providers listed here are edge-safe.  Credentials is added in auth.ts only.
  providers: [Google],
  callbacks: {
    /**
     * Persist role + id into the JWT on every sign-in.
     * On subsequent requests `user` is undefined; the token is returned as-is.
     */
    jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.role = (user as { role?: string }).role
      }
      return token
    },
    /** Expose id + role on the client-side session object. */
    session({ session, token }) {
      session.user.id = token.id as string
      session.user.role = token.role as string
      return session
    },
  },
} satisfies NextAuthConfig
