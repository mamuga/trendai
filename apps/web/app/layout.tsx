import { Inter } from "next/font/google"
import { Toaster } from "@/components/ui/toaster"
import { AuthProvider } from "@/components/providers/auth-provider"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: 'TrendAI',
  description: 'Influencer Campaign Management Platform',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        
          <AuthProvider>
            {children}
            <Toaster />
          </AuthProvider>
      </body>
    </html>
  )
}
