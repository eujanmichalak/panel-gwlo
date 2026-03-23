"use client";
import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { ShieldCheck, ArrowRight, Lock, Mail } from "lucide-react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  
  const router = useRouter();
  const supabase = createClient();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    try {
      // Logowanie do nowej bazy
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: password,
      });

      if (error) {
        console.error("Błąd logowania:", error.message);
        // Tłumaczenie błędów dla Adama
        if (error.message.includes("Invalid login credentials")) {
          setErrorMsg("BŁĄD: ZŁY EMAIL LUB HASŁO");
        } else if (error.message.includes("Email not confirmed")) {
          setErrorMsg("BŁĄD: POTWIERDŹ EMAIL W PANELU");
        } else {
          setErrorMsg(`BŁĄD: ${error.message.toUpperCase()}`);
        }
        setLoading(false);
      } else {
        // SUKCES - Lecimy na dashboard
        console.log("Zalogowano pomyślnie!", data.user?.email);
        router.replace("/");
        router.refresh();
      }
    } catch (err) {
      setErrorMsg("BŁĄD KRYTYCZNY POŁĄCZENIA");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4 font-sans">
      <div className="w-full max-w-[440px]">
        
        {/* LOGO */}
        <div className="text-center mb-10">
          <div className="inline-flex p-5 bg-blue-600 text-white rounded-[32px] shadow-[0_20px_40px_rgba(37,99,235,0.25)] mb-6 transform -rotate-3">
            <ShieldCheck size={48} strokeWidth={2.5} />
          </div>
          <h1 className="text-5xl font-black text-slate-900 italic uppercase tracking-tighter leading-none">
            Liga <span className="text-blue-600">Gorzów</span>
          </h1>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] mt-4">System Zarządzania Rozgrywkami</p>
        </div>

        {/* FORMULARZ */}
        <div className="bg-white border-[6px] border-slate-100 rounded-[50px] p-8 md:p-12 shadow-[0_40px_80px_rgba(0,0,0,0.05)] relative overflow-hidden">
          
          <form onSubmit={handleLogin} className="space-y-7 relative z-10">
            
            {/* EMAIL */}
            <div className="space-y-3">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] ml-4">Twój Email</label>
              <div className="relative group">
                <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={20} />
                <input 
                  type="email" 
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="NAZWA@DOMENA.PL" 
                  className="w-full bg-slate-50 border-2 border-transparent focus:border-blue-600 focus:bg-white rounded-[24px] py-5 pl-14 pr-8 font-black text-sm outline-none uppercase italic transition-all text-slate-900 placeholder:text-slate-300" 
                  required
                />
              </div>
            </div>

            {/* HASŁO */}
            <div className="space-y-3">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] ml-4">Hasło Dostępu</label>
              <div className="relative group">
                <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={20} />
                <input 
                  type="password" 
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••" 
                  className="w-full bg-slate-50 border-2 border-transparent focus:border-blue-600 focus:bg-white rounded-[24px] py-5 pl-14 pr-8 font-black text-sm outline-none transition-all text-slate-900 placeholder:text-slate-300" 
                  required
                />
              </div>
            </div>

            {/* ERROR */}
            {errorMsg && (
              <div className="bg-red-50 border-2 border-red-100 text-red-600 text-[10px] font-black uppercase tracking-wider p-4 rounded-2xl text-center">
                {errorMsg}
              </div>
            )}

            {/* PRZYCISK */}
            <button 
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-slate-900 text-white py-6 rounded-[28px] font-black text-sm uppercase tracking-[0.2em] shadow-[0_15px_30px_rgba(37,99,235,0.3)] transition-all active:scale-[0.97] flex items-center justify-center gap-4 group disabled:opacity-50"
            >
              {loading ? "WERYFIKACJA..." : (
                <>
                  WCHODZĘ DO GRY <ArrowRight size={20} strokeWidth={3} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          {/* DEKO */}
          <div className="absolute -right-10 -bottom-10 text-[160px] font-black text-slate-50 italic select-none pointer-events-none uppercase leading-none">
            GO
          </div>
        </div>

        <p className="text-center mt-10 text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">
          Brak dostępu? <span className="text-blue-600 cursor-pointer hover:underline">Zgłoś się do Administratora</span>
        </p>
      </div>
    </div>
  );
}