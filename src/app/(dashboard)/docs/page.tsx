"use client";
import { FileText, Wallet, Info, ArrowRight } from "lucide-react";
import DocumentCard from "@/components/DocumentCard";
import PaymentCard from "@/components/PaymentCard";

export default function DocumentsPage() {
  return (
    <div className="flex flex-col gap-10 w-full lg:w-[85%] mx-auto pb-20 transition-all duration-500">
      
      {/* HEADER - HEAVY & ITALIC */}
      <div className="relative">
        <div className="space-y-1 relative z-10">
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight italic uppercase leading-none">
            Finanse i <span className="text-blue-600">Dokumenty</span>
          </h1>
          <p className="text-slate-400 font-black text-[10px] md:text-xs uppercase tracking-[0.3em] mt-2">
            Centrum rozliczeń i formalności Twojego zespołu
          </p>
        </div>
        <span className="absolute -left-6 -top-8 text-[90px] font-black text-slate-50 opacity-[0.04] select-none pointer-events-none uppercase italic">
          Files
        </span>
      </div>

      <div className="grid grid-cols-1 gap-10">
        
        {/* SEKCJA 1: DOKUMENTY - HEAVY SPACING */}
        <section className="space-y-6">
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-600 text-white rounded-xl shadow-lg shadow-blue-100">
                <FileText size={20} strokeWidth={3} />
              </div>
              <h2 className="text-sm font-black text-slate-800 uppercase tracking-widest italic">Wymagane Podpisy</h2>
            </div>
            <span className="hidden md:block text-[10px] font-black text-slate-300 uppercase tracking-[0.2em]">Status: 1/2 Podpisano</span>
          </div>
          
          <div className="grid grid-cols-1 gap-4">
            <DocumentCard title="Regulamin Kaucji Sezon 2026" status="unsigned" />
            <DocumentCard title="Zgoda na wizerunek (RODO)" status="signed" />
          </div>
        </section>

        {/* SEKCJA 2: PŁATNOŚCI - HEAVY SPACING */}
        <section className="space-y-6">
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-500 text-white rounded-xl shadow-lg shadow-emerald-100">
                <Wallet size={20} strokeWidth={3} />
              </div>
              <h2 className="text-sm font-black text-slate-800 uppercase tracking-widest italic">Status Płatności</h2>
            </div>
            <button className="text-[10px] font-black text-blue-600 uppercase tracking-widest hover:underline flex items-center gap-2">
              Historia wpłat <ArrowRight size={14} strokeWidth={3} />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <PaymentCard title="Kaucja zwrotna" amount={200} status="paid" />
            <PaymentCard title="Wpisowe do ligi" amount={450} status="pending" />
          </div>
        </section>

        {/* FOOTER INFO - HEAVY ALERT BOX */}
        <div className="mt-6 p-8 bg-slate-900 rounded-[32px] shadow-2xl shadow-slate-200 relative overflow-hidden group">
          {/* Dekoracyjny element w tle boxa */}
          <Info className="absolute -right-4 -bottom-4 text-white opacity-5 rotate-12 group-hover:rotate-0 transition-transform duration-700" size={120} />
          
          <div className="flex gap-6 items-start relative z-10">
            <div className="p-3 bg-blue-600 text-white rounded-2xl shadow-lg">
              <Info size={24} strokeWidth={3} />
            </div>
            <div className="space-y-2">
              <p className="text-lg font-black text-white uppercase italic tracking-tight">Informacja o fakturach</p>
              <p className="text-sm text-slate-400 font-bold leading-relaxed max-w-2xl uppercase text-[11px] tracking-wide opacity-80">
                Faktury VAT za opłacone wpisowe są generowane automatycznie w ciągu 48h od zaksięgowania wpłaty i będą dostępne do pobrania w tym miejscu. W razie problemów skontaktuj się z administratorem ligi.
              </p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}