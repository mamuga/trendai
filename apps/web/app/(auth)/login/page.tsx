"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { LoginCredentials } from "@repo/shared"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card"
import { Icons } from "@/components/ui/icons"
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import { Loader2, Mail, Lock, AlertCircle } from "lucide-react"
import { api } from "@/lib/api"

export default function LoginPage() {
  const router = useRouter()
  const [credentials, setCredentials] = useState({ email: "", password: "" })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      const response = await api.auth.login(credentials)
      localStorage.setItem("token", response.data.token)
      router.push(
        response.data.user.role === "INFLUENCER" 
          ? "/influencer/campaigns" 
          : "/brand/campaigns"
      )
    } catch (error) {
      setError("Invalid email or password. Please try again.")
      console.error("Login failed:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 px-4 py-8">
      <Card className="w-full max-w-[400px] shadow-lg">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-6">
            <Icons.logo className="h-10 w-10" />
          </div>
          <CardTitle className="text-2xl font-bold text-center">
            Welcome back
          </CardTitle>
          <CardDescription className="text-center">
            Login to your account to continue
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  className="pl-10"
                  value={credentials.email}
                  onChange={(e) => setCredentials(prev => ({
                    ...prev,
                    email: e.target.value
                  }))}
                  disabled={isLoading}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="pl-10"
                  value={credentials.password}
                  onChange={(e) => setCredentials(prev => ({
                    ...prev,
                    password: e.target.value
                  }))}
                  disabled={isLoading}
                  required
                />
              </div>
            </div>
            <Button 
              type="submit" 
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Logging in...
                </>
              ) : (
                'Login'
              )}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-sm text-muted-foreground text-center">
            Don't have an account?{' '}
            <Button 
              variant="link" 
              className="p-0 h-auto font-semibold"
              onClick={() => router.push('/register')}
            >
              Sign up
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}