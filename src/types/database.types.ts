export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          full_name: string
          role: 'Administrator' | 'Kapitan' | 'Wicekapitan'
          team_id: string | null
          avatar_url: string | null
          discord_user_id: string | null
          discord_webhook_url: string | null
          notify_discord: boolean
          created_at: string
        }
        Insert: {
          id: string
          full_name: string
          role?: 'Administrator' | 'Kapitan' | 'Wicekapitan'
          team_id?: string | null
          avatar_url?: string | null
          discord_user_id?: string | null
          discord_webhook_url?: string | null
          notify_discord?: boolean
          created_at?: string
        }
        Update: {
          full_name?: string
          role?: 'Administrator' | 'Kapitan' | 'Wicekapitan'
          team_id?: string | null
          avatar_url?: string | null
          discord_user_id?: string | null
          discord_webhook_url?: string | null
          notify_discord?: boolean
        }
      }
      teams: {
        Row: {
          id: string
          name: string
          league_number: number | null
          captain_id: string | null
          logo_url: string | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          league_number?: number | null
          captain_id?: string | null
          logo_url?: string | null
          created_at?: string
        }
        Update: {
          name?: string
          league_number?: number | null
          captain_id?: string | null
          logo_url?: string | null
        }
      }
      players: {
        Row: {
          id: string
          team_id: string
          name: string
          number: number | null
          goals: number
          yellow_cards: number
          is_active: boolean
        }
        Insert: {
          id?: string
          team_id: string
          name: string
          number?: number | null
          goals?: number
          yellow_cards?: number
          is_active?: boolean
        }
        Update: {
          name?: string
          number?: number | null
          goals?: number
          yellow_cards?: number
          is_active?: boolean
        }
      }
      matches: {
        Row: {
          id: string
          home_team_id: string
          away_team_id: string
          scheduled_date: string
          pitch_address: string | null
          status: 'pending' | 'accepted' | 'declined' | 'finished'
          proposed_by: string | null
          home_score: number
          away_score: number
          result_status: 'none' | 'awaiting_confirmation' | 'confirmed'
          result_submitted_by: string | null
          created_at: string
        }
        Insert: {
          id?: string
          home_team_id: string
          away_team_id: string
          scheduled_date: string
          pitch_address?: string | null
          status?: 'pending' | 'accepted' | 'declined' | 'finished'
          proposed_by?: string | null
          home_score?: number
          away_score?: number
          result_status?: 'none' | 'awaiting_confirmation' | 'confirmed'
          result_submitted_by?: string | null
          created_at?: string
        }
        Update: {
          scheduled_date?: string
          status?: 'pending' | 'accepted' | 'declined' | 'finished'
          home_score?: number
          away_score?: number
          result_status?: 'none' | 'awaiting_confirmation' | 'confirmed'
          result_submitted_by?: string | null
        }
      }
      chat_messages: {
        Row: {
          id: string
          room_id: string
          sender_id: string | null
          content: string
          is_system_msg: boolean
          created_at: string
        }
        Insert: {
          id?: string
          room_id: string
          sender_id?: string | null
          content: string
          is_system_msg?: boolean
          created_at?: string
        }
        Update: {
          content?: string
        }
      }
      documents: {
        Row: {
          id: string
          user_id: string | null
          title: string
          status: 'signed' | 'unsigned'
          file_url: string | null
        }
        Insert: {
          id?: string
          user_id?: string | null
          title: string
          status?: 'signed' | 'unsigned'
          file_url?: string | null
        }
        Update: {
          status?: 'signed' | 'unsigned'
          file_url?: string | null
        }
      }
      payments: {
        Row: {
          id: string
          user_id: string | null
          amount: number | null
          status: 'paid' | 'pending'
          title: string | null
        }
        Insert: {
          id?: string
          user_id?: string | null
          amount?: number | null
          status?: 'paid' | 'pending'
          title?: string | null
        }
        Update: {
          amount?: number | null
          status?: 'paid' | 'pending'
          title?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}

