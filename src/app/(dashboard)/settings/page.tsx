"use client";
import { useState, useEffect, useRef } from "react";
import { createClient } from "@/utils/supabase/client";
import { 
  Lock, 
  MessageSquare, 
  Settings2, 
  Link as LinkIcon, 
  AlertTriangle,
  Bot,
  Copy,
  RefreshCw,
  CheckCircle2,
  Timer,
  Send
} from "lucide-react";

export default function SettingsPage() {
  const supabase = createClient();
  const [loading, setLoading] = useState(false);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [verifyCode, setVerifyCode] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [copied, setCopied] = useState(false);
  const [testMsg, setTestMsg] = useState("");

  // 1. Pobierz profil i ustaw Realtime
  useEffect(() => {
    fetchProfile();

    // REALTIME: Nasłuchiwanie zmian w tabeli profiles
    const channel = supabase
      .channel('schema-db-changes')
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'profiles' },
        (payload) => {
          if (payload.new.id === userProfile?.id || !userProfile) {
            setUserProfile(payload.new);
            if (payload.new.discord_id) setVerifyCode(null);
          }
        }
      )
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [userProfile?.id]);

  // 2. Obsługa odliczania czasu
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0 && verifyCode) {
      handleExpire();
    }
  }, [timeLeft, verifyCode]);

  const fetchProfile = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      // @ts-ignore
      const { data } = await supabase.from('profiles').select('*').eq('id', user.id).single();
      setUserProfile(data);
      // @ts-ignore
      if (data?.discord_verify_code) {
        // @ts-ignore
        setVerifyCode(data.discord_verify_code);
        setTimeLeft(120); 
      }
    }
  };

  const handleExpire = async () => {
    setVerifyCode(null);
    if (userProfile?.id) {
      // @ts-ignore
      await supabase.from('profiles').update({ discord_verify_code: null }).eq('id', userProfile.id);
    }
  };

  const generateCode = async () => {
    setLoading(true);
    const newCode = "GZ-" + Math.random().toString(36).substring(2, 8).toUpperCase();
    if (userProfile?.id) {
      // @ts-ignore
      const { error } = await supabase.from('profiles').update({ discord_verify_code: newCode }).eq('id', userProfile.id);
      if (!error) {
        setVerifyCode(newCode);
        setTimeLeft(120);
      }
    }
    setLoading(false);
  };

  const handleDisconnect = async () => {
    if (!confirm("Czy na pewno chcesz odłączyć konto Discord?")) return;
    setLoading(true);
    // @ts-ignore
    await supabase.from('profiles').update({ discord_id: null, discord_verify_code: null }).eq('id', userProfile.id);
    setLoading(false);
  };

  const sendTestBotMessage = async () => {
    if (!testMsg) return alert("Wpisz treść wiadomości!");
    setLoading(true);
    // Wysyłamy wiadomość do kolumny 'test_message' - bot powinien zareagować na UPDATE tej kolumny
    // @ts-ignore
    const { error } = await supabase.from('profiles').update({ test_message: testMsg }).eq('id', userProfile.id);
    if (!error) {
      alert("Wysłano żądanie do bota!");
      setTestMsg("");
    }
    setLoading(false);
  };

  const copyToClipboard = async () => {
    if (verifyCode) {
      const text = `/polacz ${verifyCode}`;
      try {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        prompt("Skopiuj komendę:", text);
      }
    }
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const isConnected = !!userProfile?.discord_id;

  return (
    <div className="flex flex-col gap-6 md:gap-10 w-full lg:w-[85%] mx-auto transition-all duration-300 pb-20">
      <div>
        <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight italic uppercase">
          Ustawienia <span className="text-blue-600">Systemu</span>
        </h1>
        <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest mt-1">Centrum dowodzenia Adama Kowalskiego</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 items-stretch">
        <div className="xl:col-span-2 flex flex-col gap-8">
          
          {/* DISCORD BOT SETTINGS */}
          <div className="bg-white border border-slate-200 rounded-[32px] overflow-hidden shadow-sm flex-1">
            <div className="p-6 md:p-8 border-b border-slate-50 flex flex-col md:flex-row md:items-center justify-between bg-slate-50/30 gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-[#5865F2] text-white rounded-xl shadow-lg shadow-indigo-100">
                  <Bot size={22} />
                </div>
                <div>
                  <h2 className="text-xl font-black text-slate-800 uppercase tracking-tight">Powiadomienia Bota</h2>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Status: <span className="text-emerald-500 italic">Aktywny</span></p>
                </div>
              </div>
            </div>

            <div className="p-6 md:p-8 space-y-6">
              <p className="text-slate-500 text-sm font-bold italic">Konfiguracja alertów Discord:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { title: "Nowe Wyzwania", desc: "Alert o zaproszeniu do meczu", active: true },
                  { title: "Zmiany Statusu", desc: "Gdy rywal zaakceptuje termin", active: true },
                  { title: "Wyniki Końcowe", desc: "Raport po wpisaniu wyniku", active: true },
                  { title: "Przypomnienia", desc: "Alert 2h przed meczem", active: false }
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border-2 border-transparent hover:border-blue-100 transition-all cursor-pointer group">
                    <div className="min-w-0 pr-2">
                      <p className="font-black text-slate-800 text-sm truncate uppercase italic">{item.title}</p>
                      <p className="text-[9px] text-slate-400 font-black uppercase truncate">{item.desc}</p>
                    </div>
                    <div className={`w-10 h-6 rounded-full transition-all relative shrink-0 ${item.active ? 'bg-blue-600' : 'bg-slate-300'}`}>
                      <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${item.active ? 'left-5' : 'left-1'}`} />
                    </div>
                  </div>
                ))}
              </div>

              {/* TEST BOT MESSAGE - NOWA FUNKCJA */}
              {isConnected && (
                <div className="mt-8 p-6 bg-blue-50/50 rounded-[24px] border-2 border-blue-100 border-dashed">
                  <p className="text-[10px] font-black text-blue-600 uppercase mb-3 tracking-widest">Test komunikacji z botem</p>
                  <div className="flex gap-2">
                    <input 
                      value={testMsg}
                      onChange={(e) => setTestMsg(e.target.value)}
                      placeholder="Wpisz treść wiadomości testowej..." 
                      className="flex-1 bg-white border-2 border-blue-100 rounded-xl px-4 py-2 text-sm font-bold outline-none focus:border-blue-400 transition-all"
                    />
                    <button 
                      onClick={sendTestBotMessage}
                      disabled={loading}
                      className="bg-blue-600 text-white p-3 rounded-xl hover:bg-blue-700 transition-all active:scale-90 shadow-md shadow-blue-100"
                    >
                      <Send size={18} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* BEZPIECZEŃSTWO */}
          <div className="bg-white border border-slate-200 rounded-[32px] p-6 md:p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2.5 bg-slate-900 text-white rounded-xl">
                <Lock size={20} />
              </div>
              <h2 className="text-xl font-black text-slate-800 uppercase tracking-tight leading-none">Zmiana Hasła</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Nowe Hasło</label>
                <input type="password" placeholder="••••••••" className="w-full bg-slate-50 border-2 border-slate-50 focus:border-blue-600 focus:bg-white rounded-2xl py-4 px-6 outline-none font-black text-slate-900 transition-all italic" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Powtórz Hasło</label>
                <input type="password" placeholder="••••••••" className="w-full bg-slate-50 border-2 border-slate-50 focus:border-blue-600 focus:bg-white rounded-2xl py-4 px-6 outline-none font-black text-slate-900 transition-all italic" />
              </div>
            </div>
            <button className="bg-slate-900 text-white px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-600 transition-all active:scale-95 shadow-lg">
              Aktualizuj Hasło
            </button>
          </div>
        </div>

        {/* PRAWA KOLUMNA */}
        <div className="flex flex-col gap-8">
          <div className="bg-white border border-slate-200 rounded-[32px] p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <LinkIcon className="text-slate-400" size={18} />
              <h2 className="text-lg font-black text-slate-800 leading-none">Integracja</h2>
            </div>
            
            <div className={`p-6 rounded-[30px] border-2 flex flex-col gap-5 ${isConnected ? 'border-emerald-500 bg-emerald-50/10' : 'border-blue-600 bg-blue-50/20'}`}>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#5865F2] text-white rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-200">
                  <MessageSquare size={24} fill="white" />
                </div>
                <div>
                  <p className="font-black text-slate-900 text-sm uppercase italic">
                    {isConnected ? 'POŁĄCZONO' : 'NIEPOŁĄCZONO'}
                  </p>
                  <p className="text-[10px] font-black text-blue-600 uppercase tracking-tighter truncate max-w-[130px]">
                    {isConnected ? `ID: ${userProfile?.discord_id}` : 'Wymagane parowanie'}
                  </p>
                </div>
              </div>

              {!isConnected ? (
                <div className="space-y-4">
                  {!verifyCode ? (
                    <button 
                      onClick={generateCode}
                      disabled={loading}
                      className="w-full bg-[#5865F2] text-white py-4 rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-indigo-700 transition-all flex items-center justify-center gap-2"
                    >
                      <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
                      Generuj Kod Parowania
                    </button>
                  ) : (
                    <div className="space-y-3 animate-in fade-in slide-in-from-bottom-2">
                      <div className="bg-white border-2 border-blue-200 p-4 rounded-2xl text-center group relative cursor-pointer active:scale-[0.98] transition-all" onClick={copyToClipboard}>
                        <div className="flex justify-between items-center mb-1">
                          <p className="text-[9px] font-black text-slate-400 uppercase">Kliknij aby kopiować:</p>
                          <div className="flex items-center gap-1 text-blue-600 font-black text-[10px]">
                            <Timer size={12} />
                            {formatTime(timeLeft)}
                          </div>
                        </div>
                        <p className="text-2xl font-black text-blue-600 tracking-[0.2em] italic">{verifyCode}</p>
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-300 group-hover:text-blue-600 transition-colors">
                          {copied ? <CheckCircle2 size={18} className="text-emerald-500" /> : <Copy size={18} />}
                        </div>
                      </div>
                    </div>
                  )
                }
                </div>
              ) : (
                <button 
                  onClick={handleDisconnect}
                  disabled={loading}
                  className="w-full bg-white text-red-500 py-3 rounded-xl font-black text-[10px] uppercase border border-red-100 hover:bg-red-50 transition-all italic flex items-center justify-center gap-2"
                >
                  {loading && <RefreshCw size={12} className="animate-spin" />}
                  Rozłącz Konto Discord
                </button>
              )}
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-[32px] p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-4 text-slate-800">
              <AlertTriangle size={20} className="text-red-500" />
              <h2 className="text-lg font-black leading-none uppercase italic">Support</h2>
            </div>
            <textarea rows={3} placeholder="Opisz problem..." className="w-full bg-slate-50 border-2 border-slate-100 focus:border-red-400 focus:bg-white rounded-2xl py-4 px-4 outline-none font-black text-slate-900 transition-all text-xs resize-none mb-4 uppercase placeholder:italic" />
            <button className="w-full bg-slate-900 text-white py-4 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-red-600 transition-all">
              Wyślij Alert
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}