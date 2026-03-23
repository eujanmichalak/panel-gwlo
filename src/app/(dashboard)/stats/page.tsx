"use client";
import { Trophy, Target, Star, ChevronRight, Crown } from "lucide-react";

export default function StatsPage() {
  const leagues = [
    { 
      name: "1. Liga", 
      color: "border-amber-400", 
      text: "text-amber-500",
      bg: "bg-amber-50",
      teams: ["Turbo Kozaki", "Gorzów Warriors", "FC Orlik", "Szybkie Strzały", "Lwy Północy"],
      topScorer: { name: "Adam Kowalski", goals: 24, team: "Turbo Kozaki" }
    },
    { 
      name: "2. Liga", 
      color: "border-slate-400", 
      text: "text-slate-500",
      bg: "bg-slate-50",
      teams: ["Old Boys", "Młode Wilki", "Błękitni", "Zielona Góra Team", "Sparta"],
      topScorer: { name: "Piotr Nowak", goals: 18, team: "Old Boys" }
    },
    { 
      name: "3. Liga", 
      color: "border-orange-600", 
      text: "text-orange-700",
      bg: "bg-orange-50",
      teams: ["Amators", "FC Piaski", "Debiutanci", "Zjednoczeni", "Banda Świrów"],
      topScorer: { name: "Marek Testowy", goals: 15, team: "FC Piaski" }
    }
  ];

  return (
    <div className="flex flex-col gap-10 w-full lg:w-[90%] mx-auto pb-20 transition-all">
      
      {/* NAGŁÓWEK */}
      <div className="relative">
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter italic uppercase leading-none">
          Centrum <span className="text-blue-600">Statystyk</span>
        </h1>
        <p className="text-slate-400 font-black text-xs uppercase tracking-[0.3em] mt-3">Rankingi i Najlepsi Strzelcy • Sezon 2026</p>
        <span className="absolute -left-6 -top-10 text-[100px] font-black text-slate-50 opacity-[0.05] select-none pointer-events-none uppercase italic">Stats</span>
      </div>

      {/* GRID LIGOWY */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {leagues.map((liga, idx) => (
          <div key={idx} className="flex flex-col gap-6">
            
            {/* KARTA TOP 5 DRUŻYN */}
            <div className={`bg-white border-t-8 ${liga.color} rounded-[32px] p-6 shadow-xl shadow-slate-200/50 relative overflow-hidden`}>
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-2xl font-black text-slate-900 uppercase italic tracking-tighter">{liga.name}</h2>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Tabela Top 5</p>
                </div>
                <Trophy className={liga.text} size={32} strokeWidth={2.5} />
              </div>

              <div className="space-y-2">
                {liga.teams.map((team, i) => (
                  <div key={i} className={`flex items-center justify-between p-4 rounded-2xl ${i === 0 ? liga.bg : 'bg-white border border-slate-50'}`}>
                    <div className="flex items-center gap-4">
                      <span className={`w-6 text-sm font-black italic ${i === 0 ? liga.text : 'text-slate-300'}`}>{i + 1}.</span>
                      <span className={`text-sm font-black uppercase tracking-tight ${i === 0 ? 'text-slate-800' : 'text-slate-600'}`}>{team}</span>
                    </div>
                    {i === 0 && <Star className="text-amber-400 fill-amber-400" size={14} />}
                  </div>
                ))}
              </div>

              <button className="w-full mt-6 py-3 bg-slate-50 hover:bg-slate-100 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 transition-all flex items-center justify-center gap-2">
                Pełna Tabela <ChevronRight size={14} />
              </button>
            </div>

            {/* KARTA TOP STRZELCA LIGI */}
            <div className="bg-slate-900 rounded-[32px] p-8 relative overflow-hidden group">
              {/* Dekoracyjne tło */}
              <Target className="absolute -right-6 -bottom-6 text-white opacity-10 rotate-12 group-hover:rotate-0 transition-transform duration-700" size={120} />
              
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-4">
                  <div className={`p-1.5 ${liga.bg} ${liga.text} rounded-lg`}>
                    <Crown size={16} strokeWidth={3} />
                  </div>
                  <span className="text-[10px] font-black text-white/50 uppercase tracking-[0.2em]">Król Strzelców {liga.name}</span>
                </div>
                
                <h3 className="text-2xl font-black text-white uppercase italic leading-tight tracking-tight">
                  {liga.topScorer.name}
                </h3>
                <p className={`text-xs font-black uppercase tracking-widest mt-1 ${liga.text}`}>
                  {liga.topScorer.team}
                </p>

                <div className="mt-6 flex items-baseline gap-2">
                  <span className="text-5xl font-black text-white italic tracking-tighter">{liga.topScorer.goals}</span>
                  <span className="text-sm font-black text-white/40 uppercase italic">Goli</span>
                </div>
              </div>
            </div>

          </div>
        ))}
      </div>

      {/* DOLNA SEKCJA - ZŁOTA BUTA (Globalna) */}
      <div className="bg-blue-600 rounded-[48px] p-10 text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-[0_20px_50px_rgba(37,99,235,0.3)] relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-4xl font-black uppercase italic tracking-tighter leading-none">Złoty <span className="text-blue-200 text-5xl">But</span></h2>
          <p className="font-black text-blue-100 uppercase tracking-[0.3em] text-xs mt-2">Ranking wszystkich lig</p>
          <div className="mt-8 flex gap-8">
             <div className="text-center">
                <p className="text-[10px] font-black text-blue-200 uppercase">Najwięcej goli</p>
                <p className="text-3xl font-black italic">67</p>
             </div>
             <div className="text-center border-l border-blue-400 pl-8">
                <p className="text-[10px] font-black text-blue-200 uppercase">Średnia na mecz</p>
                <p className="text-3xl font-black italic">3.2</p>
             </div>
          </div>
        </div>
        <div className="relative z-10 w-full md:w-1/3">
           <div className="bg-white/10 backdrop-blur-md rounded-[28px] p-6 border border-white/20">
              <p className="text-xs font-black uppercase tracking-widest mb-4">Aktualny Lider:</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-blue-600 font-black text-xl italic shadow-xl">1</div>
                <div>
                  <p className="font-black text-lg uppercase italic leading-none">Adam Kowalski</p>
                  <p className="text-[10px] font-black text-blue-200 uppercase mt-1 tracking-wider">Turbo Kozaki (1. Liga)</p>
                </div>
              </div>
           </div>
        </div>
        {/* Wielkie ikony w tle */}
        <Target size={300} className="absolute -right-20 -top-20 text-white opacity-5 pointer-events-none" />
      </div>

    </div>
  );
}