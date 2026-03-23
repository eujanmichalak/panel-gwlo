import { NextResponse, type NextRequest } from 'next/server'
import { createClient } from '@/utils/supabase/server'

// Używamy "export default", co Next.js 16 preferuje w niektórych konfiguracjach Turbopacka
export default async function middleware(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    const isLoginPage = request.nextUrl.pathname.startsWith('/login')

    // 1. Jeśli brak użytkownika i nie jesteśmy na loginie -> do logowania
    if (!user && !isLoginPage) {
      return NextResponse.redirect(new URL('/login', request.url))
    }

    // 2. Jeśli jest użytkownik i pcha się na login -> do dashboardu (/)
    if (user && isLoginPage) {
      return NextResponse.redirect(new URL('/', request.url))
    }

    return NextResponse.next()
  } catch (e) {
    return NextResponse.next()
  }
}

// Config musi być wyeksportowany osobno
export const config = {
  matcher: [
    /*
     * Matcher wykluczający pliki statyczne i API
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}