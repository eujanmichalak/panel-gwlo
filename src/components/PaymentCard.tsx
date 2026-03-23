"use client";

interface PaymentProps {
  title: string;
  amount: number;
  status: "paid" | "pending";
}

export default function PaymentCard({ title, amount, status }: PaymentProps) {
  const isPaid = status === "paid";

  return (
    <div className="flex items-center justify-between p-6 bg-white border-2 border-slate-50 rounded-[32px] hover:border-blue-100 transition-all shadow-sm">
      <div className="flex items-center gap-5">
        <div className="w-12 h-12 bg-slate-100 text-slate-500 rounded-2xl flex items-center justify-center text-xs font-black tracking-widest">
          PLN
        </div>
        <div>
          <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">{title}</h3>
          <p className="text-2xl font-black text-slate-900 italic tracking-tighter leading-none">{amount},00 zł</p>
        </div>
      </div>

      <div className={`flex items-center gap-2 px-5 py-2.5 rounded-[18px] border-2 shadow-sm ${
        isPaid 
          ? 'bg-emerald-50 border-emerald-100 text-emerald-600' 
          : 'bg-red-50 border-red-100 text-red-500 animate-pulse'
      }`}>
        <div className={`w-2 h-2 rounded-full ${isPaid ? 'bg-emerald-500' : 'bg-red-500'}`} />
        <span className="text-[11px] font-black uppercase tracking-widest">{isPaid ? 'Opłacona' : 'Zaległość'}</span>
      </div>
    </div>
  );
}