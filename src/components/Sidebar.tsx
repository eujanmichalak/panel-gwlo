"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { 
  Home, 
  Calendar, 
  Users, 
  BarChart3, 
  MessageSquare, 
  FileText, 
  Settings, 
  Zap,
  LogOut 
} from "lucide-react";
import { createClient } from "@/utils/supabase/client";

// Definicja typów dla profilu użytkownika
interface SidebarProps {
  userProfile: {
    full_name: string;
    role: string;
    avatar_url?: string;
  } | null;
}

const menuItems = [
  { name: "Home", href: "/", icon: Home },
  { name: "Kalendarz", href: "/calendar", icon: Calendar },
  { name: "Skład", href: "/team", icon: Users },
  { name: "Statystyki", href: "/stats", icon: BarChart3 },
  { name: "Wiadomości", href: "/messages", icon: MessageSquare },
  { name: "Dokumenty", href: "/docs", icon: FileText },
  { name: "Ustawienia", href: "/settings", icon: Settings },
];

export default function Sidebar({ userProfile }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();

  // Funkcja Wylogowania
  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.refresh(); // Odśwież stan aplikacji
    window.location.href = "/login"; // Powrót do bramki
  };

  return (
    <aside className="w-72 h-screen bg-white border-r border-slate-100 flex flex-col fixed left-0 top-0 z-50">
      
      {/* LOGO SEKCJA */}
      <div className="p-8 flex items-center gap-3">
        <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-[0_0_15px_rgba(37,99,235,0.4)]">
          <Zap size={22} fill="currentColor" />
        </div>
        <div className="flex flex-col">
          <span className="font-black text-xl tracking-tighter text-slate-800 leading-none">GWLO</span>
          <span className="text-[10px] font-bold text-blue-500 uppercase tracking-[0.2em]">Gorzów 2026</span>
        </div>
      </div>

      {/* MENU NAWIGACJI */}
      <nav className="flex-1 px-4 space-y-1">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 group ${
                isActive
                  ? "bg-blue-600 text-white shadow-[0_10px_20px_rgba(37,99,235,0.2)]"
                  : "text-slate-400 hover:bg-slate-50 hover:text-slate-600"
              }`}
            >
              <div className={`transition-transform duration-300 group-hover:scale-110 ${isActive ? "text-white" : ""}`}>
                <Icon size={20} />
              </div>
              <span className="font-bold text-[14px] uppercase tracking-tight">{item.name}</span>
              
              {isActive && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_white]" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* USER PANEL & LOGOUT */}
      <div className="p-4 border-t border-slate-50 bg-slate-50/50">
        <div className="bg-white p-3 rounded-[2rem] shadow-sm border border-slate-100 flex items-center gap-3">
          
          {/* Avatar z inicjałem */}
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 p-[2px]">
            <div className="w-full h-full rounded-[14px] bg-white flex items-center justify-center font-black text-blue-600">
              {userProfile?.full_name?.charAt(0) || "U"}
            </div>
          </div>

          {/* Dane usera */}
          <div className="flex flex-col flex-1 overflow-hidden">
            <span className="text-sm font-black text-slate-800 truncate leading-tight">
              {userProfile?.full_name || "Gość"}
            </span>
            <span className="text-[10px] text-blue-500 font-bold uppercase tracking-wider">
              {userProfile?.role || "Brak roli"}
            </span>
          </div>

          {/* Przycisk Logout - mały, sprytny */}
          <button 
            onClick={handleLogout}
            className="p-2.5 rounded-xl bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-all group"
            title="Wyloguj"
          >
            <LogOut size={18} className="group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
        
        <p className="text-center text-[9px] text-slate-400 font-bold uppercase mt-4 tracking-[0.3em]">
          System Zarządzania Ligą
        </p>
      </div>
    </aside>
  );
}