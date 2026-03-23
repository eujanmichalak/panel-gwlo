"use client";
import { useState } from "react";
import { User, Edit2, Trash2, Save, X, Loader2, AlertTriangle } from "lucide-react";
// POPRAWIONY IMPORT: wychodzimy z components do src, potem do utils
import { createClient } from "../utils/supabase/client";

interface PlayerRowProps {
  player: any;
  onRefresh: () => void;
}

export default function PlayerRow({ player, onRefresh }: PlayerRowProps) {
  const supabase = createClient();
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editData, setEditData] = useState({ full_name: player.full_name });

  const handleSave = async () => {
    setLoading(true);
    const { error } = await (supabase.from('players') as any)
      .update({ full_name: editData.full_name.toUpperCase().trim() })
      .eq('id', player.id);

    if (!error) {
      setIsEditing(false);
      onRefresh();
    }
    setLoading(false);
  };

  const handleDelete = async () => {
    setLoading(true);
    const { error } = await supabase.from('players').delete().eq('id', player.id);
    if (!error) onRefresh();
    setLoading(false);
  };

  return (
    <div className="bg-white border-2 border-slate-100 rounded-[24px] p-4 md:p-5 flex items-center justify-between group hover:border-blue-600 hover:shadow-xl hover:shadow-blue-50/50 transition-all italic font-black">
      <div className="flex items-center gap-4 flex-1 min-w-0">
        <div className="w-10 h-10 md:w-12 md:h-12 bg-slate-900 text-white rounded-[16px] flex items-center justify-center shadow-lg shrink-0 group-hover:bg-blue-600 transition-colors">
          <User size={22} strokeWidth={2.5} />
        </div>
        
        <div className="flex flex-col min-w-0 flex-1">
          {isEditing ? (
            <input 
              value={editData.full_name} 
              onChange={(e) => setEditData({ full_name: e.target.value.toUpperCase() })} 
              className="text-slate-900 uppercase border-b-2 border-blue-600 outline-none bg-transparent w-full py-1 text-lg font-black" 
              autoFocus
            />
          ) : (
            <h3 className="text-slate-800 uppercase tracking-tight text-base md:text-lg leading-tight break-words pr-2">
              {player.full_name}
            </h3>
          )}
        </div>
      </div>

      <div className="flex items-center gap-6 md:gap-10 shrink-0 ml-4">
        <div className="flex flex-col items-end leading-none">
          <span className="text-[9px] md:text-[10px] text-blue-600 uppercase mb-1 tracking-[0.2em]">Bramki</span>
          <span className="text-2xl md:text-3xl text-slate-900 tabular-nums">{player.goals || 0}</span>
        </div>

        <div className="flex gap-1 md:gap-2">
          {isEditing ? (
            <>
              <button onClick={handleSave} className="text-blue-600 p-2 hover:bg-blue-50 rounded-lg transition-all active:scale-90">
                {loading ? <Loader2 className="animate-spin" size={20}/> : <Save size={22} strokeWidth={3} />}
              </button>
              <button onClick={() => setIsEditing(false)} className="text-slate-400 p-2 hover:bg-slate-50 rounded-lg transition-all">
                <X size={22} strokeWidth={3} />
              </button>
            </>
          ) : isDeleting ? (
            <div className="flex items-center gap-2 animate-in slide-in-from-right-2">
              <button onClick={handleDelete} className="bg-red-600 text-white px-4 py-2 rounded-xl text-[10px] uppercase hover:bg-red-700 transition-all active:scale-95 flex items-center gap-1">
                {loading ? <Loader2 className="animate-spin" size={12}/> : "POTWIERDŹ"}
              </button>
              <button onClick={() => setIsDeleting(false)} className="text-slate-400 p-2 hover:bg-slate-100 rounded-lg">
                <X size={18} strokeWidth={3} />
              </button>
            </div>
          ) : (
            <div className="flex gap-1 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0">
              <button onClick={() => setIsEditing(true)} className="text-slate-400 hover:text-blue-600 p-2 transition-colors">
                <Edit2 size={18} strokeWidth={2.5} />
              </button>
              <button onClick={() => setIsDeleting(true)} className="text-slate-400 hover:text-red-500 p-2 transition-colors">
                <Trash2 size={18} strokeWidth={2.5} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}