"use client"

import { useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { MainNav } from "@/components/main-nav"
import { UserNav } from "@/components/user-nav"
import { useAuth } from "@/hooks/use-auth"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user, loading } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login')
    }
  }, [user, loading, router])

  if (loading || !user) return null

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="border-b">
        <div className="container flex h-16 items-center px-4">
          <MainNav />
          <div className="ml-auto flex items-center space-x-4">
            <UserNav user={user} />
          </div>
        </div>
      </header>
      <main className="flex-1 container py-6">
        {children}
      </main>
    </div>
  )
}