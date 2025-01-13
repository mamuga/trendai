"use client"

import { useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { MainNav } from "@/components/main-nav"
import { UserNav } from "@/components/user-nav"
import { useAuth } from "@/components/providers/auth-provider"
import { Loader2 } from "lucide-react"

export default function DashboardLayout({
                                          children,
                                        }: {
  children: React.ReactNode
}) {
  const { user, loading } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push('/login')
      } else {
        // Check if user is accessing the correct role-based route
        const isInfluencerPath = pathname.startsWith('/dashboard/influencer')
        const isBrandPath = pathname.startsWith('/dashboard/brand')

        if (user.role === 'INFLUENCER' && !isInfluencerPath) {
          router.push('/dashboard/influencer/campaigns')
        } else if (user.role === 'BRAND' && !isBrandPath) {
          router.push('/dashboard/brand/campaigns')
        }
      }
    }
  }, [user, loading, router, pathname])

  if (loading) {
    return (
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
    )
  }

  if (!user) return null

  // Don't render if user is on wrong role path
  const isInfluencerPath = pathname.startsWith('/dashboard/influencer')
  const isBrandPath = pathname.startsWith('/dashboard/brand')
  if (
      (user.role === 'INFLUENCER' && !isInfluencerPath) ||
      (user.role === 'BRAND' && !isBrandPath)
  ) {
    return null
  }

  return (
      <div className="min-h-screen flex flex-col">
        <header className="sticky top-0 z-40 border-b bg-background">
          <div className="container flex h-16 items-center px-4">
            <MainNav />
            <div className="ml-auto flex items-center space-x-4">
              <UserNav user={user} />
            </div>
          </div>
        </header>
        <main className="flex-1 container mx-auto px-4 py-6">
          {children}
        </main>
      </div>
  )
}