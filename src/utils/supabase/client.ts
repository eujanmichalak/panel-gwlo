import { createBrowserClient } from '@supabase/ssr'

// Definicja typów bezpośrednio tutaj, żeby uniknąć błędów importu
export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          full_name: string
          role: 'Administrator' | 'Kapitan' | 'Wicekapitan'
          team_id: string | null
        }
      }
    }
  }
}

export const createClient = () => {
  // Pobieramy klucze z konfiguracji NEXT (env)
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // Mały sprawdzian w konsoli przeglądarki (F12)
  if (!supabaseUrl || !supabaseKey) {
    console.error("❌ BŁĄD: Dalej nie widzę kluczy! Upewnij się, że zrestartowałeś serwer.");
  }

  return createBrowserClient<Database>(
    supabaseUrl!,
    supabaseKey!
  )
}