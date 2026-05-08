import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { getDashboardRoute } from "@/lib/rbac"

/**
 * /dashboard — role-aware entry point.
 * The middleware already blocks unauthenticated access;
 * this component redirects authenticated users to their role dashboard.
 */
export default async function DashboardPage() {
  const session = await auth()

  if (!session?.user) {
    redirect("/login")
  }

  redirect(getDashboardRoute(session.user.role))
}
