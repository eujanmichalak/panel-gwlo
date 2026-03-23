"use client";
import { useState } from "react";
import { format, addMonths, subMonths, startOfMonth, endOfMonth, startOfWeek, endOfWeek, isSameMonth, isSameDay, addDays } from "date-fns";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Plus } from "lucide-react";
import ProposalModal from "./ProposalModal";

export default function Calendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDateForModal, setSelectedDateForModal] = useState<Date | null>(null);

  const polskieMiesiace = ["Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec", "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień"];

  const openModalWithDate = (date: Date) => {
    setSelectedDateForModal(date);
    setIsModalOpen(true);
  };

  return (
    <div className="w-full bg-white border-2 border-slate-200 rounded-[40px] overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.06)]">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row items-center justify-between p-8 bg-white gap-6">
        <div className="flex items-center gap-5">
          <div className="p-3.5 bg-blue-600 text-white rounded-[20px] shadow-lg shadow-blue-100">
            <CalendarIcon size={26} strokeWidth={2.5} />
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-black text-slate-800 tracking-tighter leading-none italic uppercase">
              {polskieMiesiace[currentMonth.getMonth()]}
            </h2>
            <span className="text-xs font-black text-blue-500 tracking-[0.3em] uppercase mt-1 block">
              Sezon {format(currentMonth, "yyyy")}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex bg-slate-100 p-1.5 rounded-[20px] border border-slate-200">
            <button onClick={() => setCurrentMonth(subMonths(currentMonth, 1))} className="p-2.5 hover:bg-white hover:shadow-sm rounded-xl transition-all text-slate-600"><ChevronLeft size={20} strokeWidth={3} /></button>
            <button onClick={() => setCurrentMonth(addMonths(currentMonth, 1))} className="p-2.5 hover:bg-white hover:shadow-sm rounded-xl transition-all text-slate-600"><ChevronRight size={20} strokeWidth={3} /></button>
          </div>
          <button onClick={() => openModalWithDate(new Date())} className="bg-slate-900 text-white px-6 py-3.5 rounded-[20px] font-black text-[10px] uppercase tracking-widest hover:bg-blue-600 transition-all shadow-lg active:scale-95 flex items-center gap-2">
            <Plus size={16} strokeWidth={3} /> Zaproponuj termin
          </button>
        </div>
      </div>

      {/* DAYS OF WEEK */}
      <div className="grid grid-cols-7 border-t border-b border-slate-100 bg-slate-50/30">
        {["Pn", "Wt", "Śr", "Cz", "Pt", "So", "Nd"].map(d => (
          <div key={d} className="py-4 text-center text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">{d}</div>
        ))}
      </div>

      {/* CELLS - HEAVY BORDERS */}
      <div className="grid grid-cols-7 border-l border-slate-100">
        {(() => {
          const monthStart = startOfMonth(currentMonth);
          const monthEnd = endOfMonth(monthStart);
          const startDate = startOfWeek(monthStart, { weekStartsOn: 1 });
          const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 });
          const cells = [];
          let day = startDate;

          while (day <= endDate) {
            for (let i = 0; i < 7; i++) {
              const isToday = isSameDay(day, new Date());
              const isCurrentMonth = isSameMonth(day, monthStart);
              const currentDay = day;

              cells.push(
                <div key={day.getTime()} className={`min-h-[100px] md:min-h-[130px] border-r border-b border-slate-100 p-4 transition-all relative group/cell ${!isCurrentMonth ? "bg-slate-50/40 opacity-30" : "bg-white hover:bg-blue-50/20"}`}>
                  <div className="flex justify-between items-start">
                    <span className={`text-sm font-black w-8 h-8 flex items-center justify-center rounded-xl italic transition-all ${
                      isToday ? "bg-blue-600 text-white shadow-lg shadow-blue-200 scale-110" : "text-slate-700"
                    }`}>
                      {format(day, "d")}
                    </span>
                    {isCurrentMonth && (
                      <button onClick={() => openModalWithDate(currentDay)} className="opacity-0 group-hover/cell:opacity-100 p-1.5 text-blue-600 hover:bg-blue-100 rounded-lg transition-all">
                        <Plus size={16} strokeWidth={3} />
                      </button>
                    )}
                  </div>
                </div>
              );
              day = addDays(day, 1);
            }
          }
          return cells;
        })()}
      </div>

      <ProposalModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} selectedDate={selectedDateForModal} />
    </div>
  );
}