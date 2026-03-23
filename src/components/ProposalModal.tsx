"use client";
import { useState, useEffect } from "react";
import { X, SendHorizontal, CheckCircle2, User, Calendar as CalIcon, MessageSquare } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDate: Date | null;
}

export default function ProposalModal({ isOpen, onClose, selectedDate }: ModalProps) {
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [dateValue, setDateValue] = useState("");

  // Kiedy otwiera się modal i mamy wybraną datę, ustawiamy ją w inpucie
  useEffect(() => {
    if (selectedDate) {
      const year = selectedDate.getFullYear();
      const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
      const day = String(selectedDate.getDate()).padStart(2, '0');
      // Format YYYY-MM-DDTHH:mm dla inputu datetime-local
      setDateValue(`${year}-${month}-${day}T18:00`); // Ustawiam domyślnie 18:00, żeby było łatwiej zmienić
    }
  }, [selectedDate, isOpen]);

  if (!isOpen) return null;

  const handleSend = () => {
    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      setIsSent(true);
      setTimeout(() => {
        setIsSent(false);
        onClose();
      }, 2000);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity" onClick={onClose} />

      <div className="relative w-full max-w-md bg-white rounded-[32px] shadow-[0_25px_70px_rgba(0,0,0,0.15)] overflow-hidden animate-in fade-in zoom-in duration-300">
        {!isSent ? (
          <div className="p-8">
            <div className="flex justify-between items-start mb-8">
              <div>
                <h3 className="text-2xl font-black text-slate-800 tracking-tight">Zaproponuj termin</h3>
                <p className="text-slate-400 text-sm font-medium">Ustal szczegóły meczu.</p>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-xl transition-colors text-slate-400">
                <X size={20} />
              </button>
            </div>

            <div className="space-y-5">
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase ml-1">Wybrany Termin</label>
                <div className="relative">
                  <CalIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-500" size={18} />
                  <input 
                    type="datetime-local" 
                    value={dateValue}
                    onChange={(e) => setDateValue(e.target.value)}
                    className="w-full bg-slate-50 border-2 border-slate-50 focus:border-blue-500 focus:bg-white rounded-2xl py-3 pl-12 pr-4 outline-none font-bold text-slate-700 transition-all" 
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase ml-1">Do kogo</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-500" size={18} />
                  <select className="w-full bg-slate-50 border-2 border-slate-50 focus:border-blue-500 focus:bg-white rounded-2xl py-3 pl-12 pr-4 outline-none font-bold text-slate-700 transition-all appearance-none">
                    <option>FC Piwnica</option>
                    <option>Orły Osiedla</option>
                    <option>Zjednoczeni Garaże</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase ml-1">Wiadomość</label>
                <div className="relative">
                  <MessageSquare className="absolute left-4 top-4 text-blue-500" size={18} />
                  <textarea rows={3} placeholder="Daj znać czy pasuje..." className="w-full bg-slate-50 border-2 border-slate-50 focus:border-blue-500 focus:bg-white rounded-2xl py-3 pl-12 pr-4 outline-none font-medium text-slate-700 transition-all resize-none" />
                </div>
              </div>

              <button
                onClick={handleSend}
                disabled={isSending}
                className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black text-lg shadow-[0_10px_20px_rgba(37,99,235,0.3)] hover:shadow-[0_15px_30px_rgba(37,99,235,0.4)] transition-all active:scale-95 flex items-center justify-center gap-3 disabled:opacity-70"
              >
                {isSending ? (
                  <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <SendHorizontal size={20} />
                    Wyślij propozycję
                  </>
                )}
              </button>
            </div>
          </div>
        ) : (
          <div className="p-12 text-center flex flex-col items-center justify-center animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mb-6 shadow-inner">
              <CheckCircle2 size={48} />
            </div>
            <h3 className="text-2xl font-black text-slate-800 mb-2">Wysłano!</h3>
            <p className="text-slate-400 font-medium">Propozycja dotarła do kapitana.</p>
          </div>
        )}
      </div>
    </div>
  );
}