"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { useAuth } from "@/components/providers/auth-provider"

export function MainNav() {
    const pathname = usePathname()
    const { user } = useAuth()

    const isInfluencer = user?.role === 'INFLUENCER'

    const routes = isInfluencer
        ? [
            {
                href: "/dashboard/influencer/campaigns",
                label: "Campaigns",
                active: pathname?.startsWith('/dashboard/influencer/campaigns'),
            },
        ]
        : [
            {
                href: "/dashboard/brand/campaigns",
                label: "Campaigns",
                active: pathname?.startsWith('/dashboard/brand/campaigns'),
            },
        ]

    return (
        <nav className="flex items-center space-x-6 text-sm font-medium">
            {routes.map((route) => (
                <Link
                    key={route.href}
                    href={route.href}
                    className={cn(
                        "transition-colors hover:text-foreground/80",
                        route.active ? "text-foreground" : "text-foreground/60"
                    )}
                >
                    {route.label}
                </Link>
            ))}
        </nav>
    )
}