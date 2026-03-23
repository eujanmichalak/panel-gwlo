"use client";
import { 
  Trophy, 
  Users, 
  Wallet, 
  Calendar as CalendarIcon, 
  ChevronRight,
  ArrowUpRight,
  ShieldCheck
} from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-8 w-full lg:w-[85%] mx-auto pb-10 transition-all duration-500">
      
      {/* HEADER */}
      <div className="space-y-1">
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight italic uppercase">
          Witaj w <span className="text-blue-600 font-extrabold">Panelu Ligi</span>
        </h1>
        <p className="text-sm text-slate-500 font-medium">Oto szybki przegląd Twojego zespołu i statusu w sezonie.</p>
      </div>

      {/* QUICK STATS - GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* KARTA: NAJBLIŻSZY MECZ */}
        <div className="bg-blue-600 rounded-[32px] p-6 text-white shadow-lg shadow-blue-100 relative overflow-hidden group">
          <CalendarIcon className="absolute -right-4 -bottom-4 text-blue-500 opacity-20 group-hover:scale-110 transition-transform" size={120} />
          <div className="relative z-10 space-y-4">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-80">Najbliższy mecz</span>
            <div>
              <h3 className="text-xl font-bold leading-tight">FC Podwórko vs Dream Team</h3>
              <p className="text-sm text-blue-100 mt-1 font-medium">Sobota, 21 Marca • 18:30</p>
            </div>
            <Link href="/calendar" className="flex items-center gap-2 text-[11px] font-bold uppercase bg-white/10 w-fit px-4 py-2 rounded-xl hover:bg-white/20 transition-all">
              Szczegóły <ChevronRight size={14} />
            </Link>
          </div>
        </div>

        {/* KARTA: KAUCJA & KASA */}
        <div className="bg-white border border-slate-200 rounded-[32px] p-6 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl">
              <Wallet size={24} />
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full border border-emerald-100">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-wider">Opłacona</span>
            </div>
          </div>
          <div className="mt-4">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Twoja Kaucja</span>
            <p className="text-2xl font-bold text-slate-900">200,00 zł</p>
          </div>
        </div>

        {/* KARTA: KADRA */}
        <div className="bg-white border border-slate-200 rounded-[32px] p-6 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
              <Users size={24} />
            </div>
            <div className="text-right font-bold text-slate-900">
              <p className="text-2xl leading-none">12</p>
              <p className="text-[10px] text-slate-400 uppercase tracking-widest">Graczy</p>
            </div>
          </div>
          <div className="mt-4">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Top Strzelec</span>
            <p className="text-base font-bold text-slate-700">Piotr Nowak (12 goli)</p>
          </div>
        </div>
      </div>

      {/* DOKUMENTY ALERT (TYLKO JEŚLI SĄ NIEPODPISANE) */}
      <div className="bg-red-50 border border-red-100 rounded-[28px] p-5 flex items-center justify-between group cursor-pointer hover:bg-red-100/50 transition-all">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-white text-red-500 rounded-full flex items-center justify-center shadow-sm">
            <ShieldCheck size={20} />
          </div>
          <div>
            <p className="text-sm font-bold text-red-900 leading-none">Wymagane podpisy!</p>
            <p className="text-[11px] text-red-600 font-semibold mt-1">Regulamin Kaucji Sezon 2026 oczekuje na zatwierdzenie.</p>
          </div>
        </div>
        <Link href="/documents" className="p-2 text-red-400 group-hover:text-red-600 transition-colors">
          <ArrowUpRight size={20} />
        </Link>
      </div>

      {/* DOLNA SEKCJA - LISTA OSTATNICH WYDARZEŃ */}
      <div className="bg-white border border-slate-200 rounded-[32px] overflow-hidden shadow-sm">
        <div className="p-6 border-b border-slate-50 flex items-center justify-between bg-slate-50/30">
          <div className="flex items-center gap-2.5">
            <Trophy size={18} className="text-blue-600" />
            <h2 className="font-bold text-slate-800 uppercase tracking-tight text-sm">Ostatnie wyniki</h2>
          </div>
          <button className="text-[10px] font-bold text-blue-600 uppercase hover:underline">Zobacz tabelę</button>
        </div>
        <div className="p-6 space-y-4">
          {[1, 2].map((i) => (
            <div key={i} className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0">
              <div className="flex items-center gap-4 min-w-[120px]">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Mecz {i}</span>
                <span className="text-sm font-semibold text-slate-700">FC Podwórko</span>
              </div>
              <div className="bg-slate-900 text-white px-3 py-1 rounded-lg font-bold text-xs">
                3 : 1
              </div>
              <div className="text-right min-w-[120px]">
                <span className="text-sm font-semibold text-slate-700">KS Osiedle</span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}