"use client"

import { useEffect, useState } from "react"
import { User } from "@repo/shared"
import { api } from "@/lib/api"

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token')
      if (!token) {
        setLoading(false)
        return
      }

      try {
        const response = await api.auth.me()
        setUser(response.data.user)
      } catch (error) {
        localStorage.removeItem('token')
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [])

  return { user, loading }
}