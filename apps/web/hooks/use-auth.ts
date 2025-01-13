"use client"

import { useCallback } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useAuth} from "@/components/providers/auth-provider";

export function useAuthRedirect() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { user } = useAuth()

  const redirectToRoleBasedDashboard = useCallback(() => {
    const callbackUrl = searchParams.get('callbackUrl')

    if (callbackUrl) {
      const isCorrectPath = user?.role === 'INFLUENCER'
          ? callbackUrl.startsWith('/dashboard/influencer')
          : callbackUrl.startsWith('/dashboard/brand')

      if (isCorrectPath) {
        router.push(callbackUrl)
        return
      }
    }

    // Default redirects if no callback or wrong role path
    if (user?.role === 'INFLUENCER') {
      router.push('/dashboard/influencer/campaigns')
    } else if (user?.role === 'BRAND') {
      router.push('/dashboard/brand/campaigns')
    }
  }, [router, searchParams, user])

  return { redirectToRoleBasedDashboard }
}