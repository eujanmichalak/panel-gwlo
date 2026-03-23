import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { Database } from '@/types/database.types'

export const createClient = () => {
  // W Next.js 15+ musimy pobrać cookieStore, ale operacje na nim 
  // wewnątrz getAll/setAll muszą obsłużyć fakt, że to Promise.
  const cookieStore = cookies()

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        async getAll() {
          return (await cookieStore).getAll()
        },
        async setAll(cookiesToSet) {
          try {
            const resolvedCookies = await cookieStore
            cookiesToSet.forEach(({ name, value, options }) =>
              resolvedCookies.set(name, value, options)
            )
          } catch {
            // Metoda set może rzucić błąd, jeśli jest wywołana w Server Component.
            // Next.js obsługuje to automatycznie przez Middleware przy zapisie sesji.
          }
        },
      },
    }
  )
}