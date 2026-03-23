import Sidebar from "@/components/Sidebar";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // 1. Inicjalizacja klienta Supabase (Server Side)
  const supabase = await createClient();

  // 2. Sprawdzenie sesji użytkownika
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // 3. Pobranie danych profilu z bazy
  // @ts-ignore
  let { data: profile, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .maybeSingle();

  // 4. Jeśli profil nie istnieje - stwórz go automatycznie
  if (!profile && !error) {
    console.log("Tworzenie profilu dla:", user.email);

    // Używamy obiektu zamiast tablicy i rzutujemy na any, by uniknąć błędów TS
    // @ts-ignore
    const { data: newProfile, error: insertError } = await supabase
      .from("profiles")
      .insert({
        id: user.id,
        full_name: user.user_metadata?.full_name || "Nowy Gracz",
      } as any)
      .select()
      .maybeSingle();

    if (!insertError) {
      profile = newProfile;
    } else {
      console.error("Błąd tworzenia profilu:", insertError.message);
    }
  }

  if (error) {
    console.error("Błąd pobierania profilu:", error.message);
  }

  return (
    <div className="flex min-h-screen bg-white">
      {/* SIDEBAR - Szerokość 72 (288px) na sztywno */}
      <div className="fixed inset-y-0 left-0 w-72 z-50">
        <Sidebar userProfile={profile} />
      </div>

      {/* GŁÓWNY CONTENT - ROZCIĄGNIĘTY */}
      <main className="flex-1 ml-72 bg-white min-h-screen">
        {/* USUNIĘTO: max-w-[1600px] i mx-auto 
            DZIĘKI TEMU: Content zajmuje 100% dostępnej szerokości po prawej stronie
        */}
        <div className="p-6 md:p-10 w-full">
          {children}
        </div>
      </main>
    </div>
  );
}