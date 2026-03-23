"use client";
import Calendar from "@/components/Calendar";

export default function CalendarPage() {
  return (
    <div className="flex flex-col gap-8 w-full lg:w-[85%] mx-auto transition-all duration-500 pb-20">
      
      {/* HEADER - HEAVY SPORT STYLE */}
      <div className="relative">
        <div className="space-y-1 relative z-10">
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight italic uppercase leading-none">
            Terminarz <span className="text-blue-600">Ligi</span>
          </h1>
          <p className="text-slate-400 font-black text-[10px] md:text-xs uppercase tracking-[0.3em] mt-2">
            Harmonogram meczów i wydarzeń • Sezon 2026
          </p>
        </div>
        
        {/* Dekoracyjny element w tle nagłówka - subtelny napis */}
        <span className="absolute -left-4 -top-6 text-[80px] font-black text-slate-50 opacity-[0.03] select-none pointer-events-none uppercase italic">
          Schedule
        </span>
      </div>

      {/* GŁÓWNY KONTENER KALENDARZA */}
      <div className="w-full group">
        <Calendar />
      </div>

      {/* DODATKOWA LEGENDA / INFO POD KALENDARZEM */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white border-2 border-slate-100 p-6 rounded-[28px] shadow-sm flex items-center gap-4">
          <div className="w-3 h-3 rounded-full bg-blue-600 shadow-[0_0_10px_rgba(37,99,235,0.4)]" />
          <span className="text-[11px] font-black text-slate-600 uppercase tracking-widest">Twoje mecze</span>
        </div>
        <div className="bg-white border-2 border-slate-100 p-6 rounded-[28px] shadow-sm flex items-center gap-4">
          <div className="w-3 h-3 rounded-full bg-emerald-500" />
          <span className="text-[11px] font-black text-slate-600 uppercase tracking-widest">Wolne terminy</span>
        </div>
        <div className="bg-white border-2 border-slate-100 p-6 rounded-[28px] shadow-sm flex items-center gap-4">
          <div className="w-3 h-3 rounded-full bg-slate-300" />
          <span className="text-[11px] font-black text-slate-600 uppercase tracking-widest">Zajęte boiska</span>
        </div>
      </div>
      
    </div>
  );
}