"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth} from "@/components/providers/auth-provider";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card"
import { Loader2, Mail, Lock } from "lucide-react"

export default function LoginPage() {
  const { login } = useAuth()
  const router = useRouter()
  const [credentials, setCredentials] = useState({ email: "", password: "" })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      await login(credentials.email, credentials.password)
    } catch (error) {
      setError("Invalid email or password. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-500 via-indigo-500 to-blue-500">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]" />
        <div className="absolute h-full w-full backdrop-blur-[2px]" />

        {/* Main Container */}
        <div className="container relative mx-auto flex w-full flex-col items-center justify-center space-y-6 px-4">
          {/* Glass Card */}
          <Card className="w-full max-w-md border border-white/20 bg-white/10 shadow-2xl backdrop-blur-md">
            <CardHeader className="space-y-3 pb-8 text-center">
              <div className="mx-auto h-16 w-16 rounded-full bg-white/20 p-3 backdrop-blur-sm">
                <div className="h-full w-full rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center">
                  <Mail className="h-6 w-6 text-white" />
                </div>
              </div>
              <CardTitle className="text-2xl font-bold text-white">
                Welcome back
              </CardTitle>
              <p className="text-sm text-white/60">
                Enter your credentials to access your account
              </p>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                {error && (
                    <div className="bg-red-500/10 border border-red-500/50 text-red-200 px-4 py-2 rounded-lg text-sm mb-4">
                      {error}
                    </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white/90">
                    Email
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-white/40" />
                    <Input
                        id="email"
                        type="email"
                        placeholder="name@example.com"
                        className="pl-9 border-white/20 bg-white/10 text-white placeholder:text-white/30 focus:border-white/40 focus:ring-white/40"
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
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password" className="text-white/90">
                      Password
                    </Label>
                    <Button
                        variant="link"
                        className="px-0 text-white/60 hover:text-white"
                        onClick={() => router.push('/forgot-password')}
                    >
                      Forgot password?
                    </Button>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-white/40" />
                    <Input
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        className="pl-9 border-white/20 bg-white/10 text-white placeholder:text-white/30 focus:border-white/40 focus:ring-white/40"
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
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 focus:ring-2 focus:ring-white/20"
                    disabled={isLoading}
                >
                  {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Signing in...
                      </>
                  ) : (
                      'Sign in'
                  )}
                </Button>
              </form>
            </CardContent>

            <CardFooter>
              <div className="w-full text-center text-white/60">
                Don't have an account?{' '}
                <Button
                    variant="link"
                    className="p-0 text-white hover:text-white/80"
                    onClick={() => router.push('/register')}
                >
                  Sign up
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
  )
}