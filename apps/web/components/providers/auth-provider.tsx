"use client"

import { createContext, useContext, ReactNode, useCallback, useEffect, useState } from "react"
import {  LoginCredentials } from "@repo/shared"
import { User } from "@repo/db"
import { api } from "@/lib/api"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  login: async () => {},
  logout: () => {},
  isAuthenticated: false,
})

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const { toast } = useToast()

  const login = async (email: string, password: string) => {
    try {
      const credentials: LoginCredentials = { email, password }
      const response = await api.auth.login(credentials)

      setUser(response.data.user)

      // Hardcoded default campaignId for testing
      const defaultCampaignId = "campaign-1"

      // Role-based redirection
      if (response.data.user.role === 'BRAND') {
        router.push(`/dashboard/brand/campaigns/${defaultCampaignId}`)
      } else if (response.data.user.role === 'INFLUENCER') {
        router.push('/dashboard/influencer/campaigns')
      }

      toast({
        title: "Success",
        description: "Successfully logged in",
      })
    } catch (error) {
      console.error("Login failed:", error)
      toast({
        variant: "destructive",
        title: "Error",
        description: "Invalid email or password",
      })
      throw error
    }
  }

  const logout = useCallback(() => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setUser(null)
    router.push('/login')
  }, [router])

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (error) {
        console.error('Error parsing stored user:', error)
        localStorage.removeItem('user')
      }
    }
    setLoading(false)
  }, [])

  return (
      <AuthContext.Provider
          value={{
            user,
            loading,
            login,
            logout,
            isAuthenticated: !!user
          }}
      >
        {children}
      </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)