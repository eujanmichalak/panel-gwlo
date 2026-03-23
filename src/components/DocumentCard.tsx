"use client";
import { FileText, Download, ChevronRight } from "lucide-react";

interface DocumentProps {
  title: string;
  status: "signed" | "unsigned";
}

export default function DocumentCard({ title, status }: DocumentProps) {
  const isSigned = status === "signed";

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between p-6 bg-white border-2 border-slate-100 rounded-[32px] hover:border-blue-600 transition-all group gap-4">
      <div className="flex items-center gap-5">
        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-inner ${
          isSigned ? 'bg-emerald-50 text-emerald-600' : 'bg-blue-50 text-blue-600'
        }`}>
          <FileText size={28} strokeWidth={2.5} />
        </div>
        <div>
          <h3 className="text-base font-black text-slate-800 uppercase tracking-tight italic">{title}</h3>
          <p className={`text-[10px] font-black uppercase tracking-[0.15em] mt-1 ${
            isSigned ? 'text-emerald-500' : 'text-red-500'
          }`}>
            {isSigned ? '● Dokument Podpisany' : '○ Oczekuje na podpis'}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {isSigned ? (
          <button className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 text-[11px] font-black text-slate-500 hover:bg-slate-50 rounded-2xl transition-all border-2 border-transparent hover:border-slate-200 uppercase tracking-widest">
            POBIERZ PDF <Download size={16} strokeWidth={3} />
          </button>
        ) : (
          <button className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 bg-blue-600 text-white text-[11px] font-black rounded-2xl hover:bg-blue-700 transition-all shadow-[0_10px_20px_rgba(37,99,235,0.2)] uppercase tracking-widest active:scale-95">
            PODPISZ TERAZ <ChevronRight size={16} strokeWidth={3} />
          </button>
        )}
      </div>
    </div>
  );
}