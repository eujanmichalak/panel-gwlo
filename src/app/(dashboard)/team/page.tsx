"use client";
import { useState, useEffect, useCallback } from "react";
import { Plus, Users, Search, Loader2, AlertCircle } from "lucide-react";
// POPRAWIONE IMPORTY: używamy relatywnych ścieżek
import { createClient } from "../../../utils/supabase/client";
import PlayerRow from "../../../components/PlayerRow";

export default function SquadPage() {
  const supabase = createClient();
  const [loading, setLoading] = useState(false);
  const [players, setPlayers] = useState<any[]>([]);
  const [newName, setNewName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [userProfile, setUserProfile] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const fetchPlayers = useCallback(async (teamId: string) => {
    const { data, error } = await supabase
      .from('players')
      .select('*')
      .eq('team_id', teamId)
      .order('full_name', { ascending: true });
    
    if (!error && data) setPlayers(data);
  }, [supabase]);

  useEffect(() => {
    const initPage = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .maybeSingle();
        
        if (profile) {
          setUserProfile(profile);
          const tId = (profile as any)?.team_id;
          if (tId) fetchPlayers(tId);
        }
      }
    };
    initPage();
  }, [fetchPlayers, supabase.auth]);

  const handleAddPlayer = async () => {
    setErrorMsg(null);
    const tId = userProfile?.team_id;
    if (!newName.trim() || !tId) return;

    setLoading(true);
    const { error } = await (supabase.from('players') as any).insert({
      full_name: newName.toUpperCase().trim(),
      team_id: tId,
      goals: 0
    });

    if (error) {
      setErrorMsg(error.message);
    } else {
      setNewName("");
      fetchPlayers(tId);
    }
    setLoading(false);
  };

  const filteredPlayers = players.filter(p => 
    p.full_name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-8 w-full pb-20 px-2 italic font-black">
      <div>
        <h1 className="text-4xl md:text-5xl text-slate-900 uppercase tracking-tighter">
          KADRA <span className="text-blue-600">Zespołu</span>
        </h1>
        <p className="text-slate-400 text-[10px] md:text-[12px] uppercase tracking-[0.4em] mt-2 font-black">
          PANEL ZARZĄDZANIA • SEZON 2026
        </p>
      </div>

      <div className="bg-white border-2 border-slate-200 rounded-[32px] md:rounded-[40px] p-6 md:p-10 shadow-sm transition-all hover:border-slate-300">
        <div className="flex flex-col md:flex-row gap-5 items-end font-black">
          <div className="flex-1 w-full space-y-3">
            <label className="text-[11px] text-slate-400 uppercase tracking-widest ml-2">Nowy Zawodnik</label>
            <input 
              type="text" 
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAddPlayer()}
              placeholder="WPISZ DANE..." 
              className="w-full bg-slate-50 border-2 border-slate-100 focus:border-blue-600 focus:bg-white rounded-[24px] h-[64px] px-8 text-slate-900 outline-none transition-all uppercase shadow-inner placeholder:text-slate-300 font-black" 
            />
          </div>
          <button 
            onClick={handleAddPlayer}
            disabled={loading || !newName.trim()}
            className="w-full md:w-56 bg-blue-600 text-white rounded-[24px] shadow-xl shadow-blue-100 hover:bg-blue-700 h-[64px] uppercase tracking-widest transition-all active:scale-95 flex items-center justify-center gap-2 font-black disabled:opacity-50"
          >
            {loading ? <Loader2 className="animate-spin" /> : <><Plus size={24} strokeWidth={4} /> DODAJ</>}
          </button>
        </div>
        {errorMsg && <div className="mt-4 text-red-500 text-xs uppercase flex items-center gap-2"><AlertCircle size={16}/> {errorMsg}</div>}
      </div>

      <div className="bg-white border-2 border-slate-200 rounded-[40px] shadow-sm overflow-hidden">
        <div className="p-6 md:p-8 border-b border-slate-100 flex flex-col md:flex-row justify-between items-center bg-slate-50/50 gap-4 font-black">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-slate-900 text-white rounded-2xl shadow-lg"><Users size={24} strokeWidth={2.5} /></div>
            <h2 className="text-xl md:text-2xl text-slate-800 uppercase tracking-tight">Twoja Kadra ({players.length})</h2>
          </div>
          <div className="relative w-full md:w-80 font-black">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={18} strokeWidth={3} />
            <input 
              type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="SZUKAJ..." 
              className="w-full bg-white border-2 border-slate-200 rounded-[20px] py-3.5 pl-14 pr-6 text-sm text-slate-900 outline-none focus:border-blue-600 transition-all uppercase font-black" 
            />
          </div>
        </div>

        <div className="p-4 md:p-8 space-y-4 min-h-[300px] font-black">
          {filteredPlayers.length > 0 ? (
            filteredPlayers.map((player) => (
              <PlayerRow 
                key={player.id} 
                player={player} 
                onRefresh={() => {
                  const tId = userProfile?.team_id;
                  if (tId) fetchPlayers(tId);
                }} 
              />
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-slate-300 gap-4 uppercase tracking-[0.3em] text-xs font-black">Lista jest pusta</div>
          )}
        </div>
      </div>
    </div>
  );
}