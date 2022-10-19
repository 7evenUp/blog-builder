export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      posts: {
        Row: {
          id: number
          created_at: string | null
          updated_at: string | null
          heading: string | null
          desc: string | null
          post_data: Json | null
          published: boolean | null
        }
        Insert: {
          id?: number
          created_at?: string | null
          updated_at?: string | null
          heading?: string | null
          desc?: string | null
          post_data?: Json | null
          published?: boolean | null
        }
        Update: {
          id?: number
          created_at?: string | null
          updated_at?: string | null
          heading?: string | null
          desc?: string | null
          post_data?: Json | null
          published?: boolean | null
        }
      }
      profiles: {
        Row: {
          id: string
          updated_at: string | null
          username: string | null
          avatar_url: string | null
          website: string | null
        }
        Insert: {
          id: string
          updated_at?: string | null
          username?: string | null
          avatar_url?: string | null
          website?: string | null
        }
        Update: {
          id?: string
          updated_at?: string | null
          username?: string | null
          avatar_url?: string | null
          website?: string | null
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

export type PostType = Database['public']['Tables']['posts']['Row']