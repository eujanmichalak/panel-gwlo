"use client";
import { useState } from "react";
import { 
  Search, 
  SendHorizontal, 
  Plus, 
  MoreVertical, 
  CheckCheck, 
  MessageSquare,
  Users,
  User
} from "lucide-react";

export default function MessagesPage() {
  const [activeChat, setActiveChat] = useState(0);

  const chats = [
    { id: 0, name: "Kapitanowie 1. Ligi", lastMsg: "Kiedy gramy ten zaległy mecz?", time: "12:45", unread: 2, group: true },
    { id: 1, name: "Adam Kowalski", lastMsg: "Dzięki za info o statystykach!", time: "Wczoraj", unread: 0, group: false },
    { id: 2, name: "Zarząd Ligi", lastMsg: "Faktura została zaakceptowana.", time: "Pn", unread: 0, group: true },
    { id: 3, name: "Marek Testowy", lastMsg: "Mogę zmienić numer na koszulce?", time: "10.03", unread: 0, group: false },
  ];

  return (
    <div className="flex flex-col gap-8 w-full lg:w-[95%] mx-auto pb-10 h-[calc(100vh-140px)] min-h-[600px]">
      
      {/* NAGŁÓWEK */}
      <div className="flex items-center justify-between px-2">
        <div className="relative">
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tighter italic uppercase leading-none">
            Wiadomości <span className="text-blue-600">Centrum</span>
          </h1>
          <p className="text-slate-400 font-black text-[10px] uppercase tracking-[0.3em] mt-2 italic">Komunikacja z ligą i kapitanami</p>
        </div>
        <button className="bg-slate-900 text-white p-4 rounded-[20px] shadow-lg hover:bg-blue-600 transition-all active:scale-95">
          <Plus size={24} strokeWidth={3} />
        </button>
      </div>

      {/* GŁÓWNY PANEL WIADOMOŚCI */}
      <div className="flex-1 bg-white border-4 border-slate-100 rounded-[40px] shadow-2xl overflow-hidden flex flex-col md:flex-row">
        
        {/* LEWA KOLUMNA - LISTA CZATÓW */}
        <div className="w-full md:w-[380px] border-r-4 border-slate-50 flex flex-col">
          <div className="p-6 border-b-4 border-slate-50">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={18} strokeWidth={3} />
              <input 
                type="text" 
                placeholder="SZUKAJ KONTAKTU..." 
                className="w-full bg-slate-50 border-2 border-transparent focus:border-blue-600 rounded-2xl py-3.5 pl-12 pr-4 text-xs font-black outline-none transition-all uppercase tracking-tighter" 
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {chats.map((chat) => (
              <div 
                key={chat.id}
                onClick={() => setActiveChat(chat.id)}
                className={`p-6 flex items-center gap-4 cursor-pointer transition-all border-b-2 border-slate-50/50 ${
                  activeChat === chat.id ? 'bg-blue-50/50 border-r-8 border-r-blue-600' : 'hover:bg-slate-50'
                }`}
              >
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-sm ${
                  chat.group ? 'bg-slate-900 text-white' : 'bg-blue-600 text-white'
                }`}>
                  {chat.group ? <Users size={24} strokeWidth={2.5} /> : <User size={24} strokeWidth={2.5} />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-black text-slate-800 text-sm uppercase italic tracking-tight truncate">{chat.name}</h3>
                    <span className="text-[10px] font-black text-slate-400 uppercase">{chat.time}</span>
                  </div>
                  <p className={`text-xs truncate font-bold ${chat.unread > 0 ? 'text-slate-900' : 'text-slate-400'}`}>
                    {chat.lastMsg}
                  </p>
                </div>
                {chat.unread > 0 && (
                  <div className="w-6 h-6 bg-blue-600 rounded-lg flex items-center justify-center text-[10px] font-black text-white italic">
                    {chat.unread}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* PRAWA KOLUMNA - OKNO CZATU */}
        <div className="flex-1 flex flex-col bg-slate-50/30">
          
          {/* HEADER CZATU */}
          <div className="p-6 bg-white border-b-4 border-slate-50 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-md">
                {chats[activeChat].group ? <Users size={20} strokeWidth={3} /> : <User size={20} strokeWidth={3} />}
              </div>
              <div>
                <h2 className="font-black text-slate-800 uppercase italic tracking-tight">{chats[activeChat].name}</h2>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                  <span className="text-[9px] font-black text-emerald-600 uppercase tracking-widest">Aktywny teraz</span>
                </div>
              </div>
            </div>
            <button className="text-slate-300 hover:text-slate-900 transition-colors">
              <MoreVertical size={24} strokeWidth={3} />
            </button>
          </div>

          {/* WIADOMOŚCI SCROLL */}
          <div className="flex-1 overflow-y-auto p-8 space-y-8">
            
            {/* OTRZYMANA */}
            <div className="flex gap-4 max-w-[80%]">
              <div className="w-10 h-10 bg-slate-200 rounded-xl flex items-center justify-center shrink-0">
                <User size={18} className="text-slate-500" />
              </div>
              <div>
                <div className="bg-white border-2 border-slate-100 p-5 rounded-[24px] rounded-tl-none shadow-sm">
                  <p className="text-sm font-bold text-slate-700 leading-relaxed italic">
                    Cześć! Czy mamy już potwierdzoną listę sędziów na najbliższą kolejkę 1. Ligi? Kapitanowie pytają.
                  </p>
                </div>
                <span className="text-[9px] font-black text-slate-300 uppercase mt-2 block ml-1">12:40 • ADAM KOWALSKI</span>
              </div>
            </div>

            {/* TWOJA WIADOMOŚĆ */}
            <div className="flex flex-row-reverse gap-4 max-w-[80%] ml-auto">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shrink-0 shadow-lg">
                <User size={18} className="text-white" />
              </div>
              <div className="items-end flex flex-col">
                <div className="bg-blue-600 p-5 rounded-[24px] rounded-tr-none shadow-blue-100 shadow-xl">
                  <p className="text-sm font-bold text-white leading-relaxed italic">
                    Tak, sędziowie są już przypisani w systemie. Możesz sprawdzić to w zakładce terminarz.
                  </p>
                </div>
                <div className="flex items-center gap-1.5 mt-2 mr-1">
                   <span className="text-[9px] font-black text-slate-300 uppercase block">12:45 • TY</span>
                   <CheckCheck size={14} className="text-blue-500" strokeWidth={3} />
                </div>
              </div>
            </div>

          </div>

          {/* INPUT WIADOMOŚCI */}
          <div className="p-6 bg-white border-t-4 border-slate-50">
            <div className="flex gap-4">
              <input 
                type="text" 
                placeholder="NAPISZ WIADOMOŚĆ..." 
                className="flex-1 bg-slate-50 border-2 border-transparent focus:border-blue-600 rounded-2xl py-4 px-6 font-black text-sm outline-none transition-all uppercase tracking-tight italic" 
              />
              <button className="bg-blue-600 text-white px-8 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 active:scale-95 flex items-center gap-2">
                <SendHorizontal size={20} strokeWidth={3} />
                <span className="hidden md:block">Wyślij</span>
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}