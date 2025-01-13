// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Paths that don't require authentication
const publicPaths = ['/login', '/register', '/forgot-password']

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl
    const token = request.cookies.get('token')?.value || request.headers.get('authorization')?.split(' ')[1]

    // Allow public paths without redirection
    if (publicPaths.includes(pathname)) {
        return NextResponse.next()
    }

    // Redirect to login if no token
    if (!token && !pathname.startsWith('/_next')) {
        const loginUrl = new URL('/login', request.url)
        return NextResponse.redirect(loginUrl)
    }

    // Continue with the request
    return NextResponse.next()
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
}