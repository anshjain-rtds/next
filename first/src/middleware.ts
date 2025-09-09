
// src/middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

console.log("Middleware is running fine. ")
export function middleware(req: NextRequest) {
  const token = req.cookies.get('nest-auth-token')
  const nextAuthToken =
    req.cookies.get('next-auth.session-token') ||
    req.cookies.get('__Secure-next-auth.session-token')

  const isProtectedRoute =
    req.nextUrl.pathname.startsWith('/snippets/:path*') ||
    req.nextUrl.pathname.startsWith('/topics/:path*')

  const isAuthRoute = req.nextUrl.pathname.startsWith('/auth')

  if ((nextAuthToken || token) && isAuthRoute) {
    return NextResponse.redirect(new URL('/', req.url))
  }

  if ((!nextAuthToken && !token) && isProtectedRoute) {
    return NextResponse.redirect(new URL('/auth', req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/snippets/:path*', '/topics/:path*', '/auth'],
}
