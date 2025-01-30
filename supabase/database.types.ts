export type UserRole = 'guest' | 'host';

export interface Profile {
  id: string;
  updated_at: string;
  username: string;
  full_name: string;
  role: UserRole;
  avatar_url?: string;
  phone?: string;
  is_verified?: boolean;
  business_name?: string;
  business_registration_number?: string;
}

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
      users: {
        Row: {
          id: string;
          aud: string;
          email: string | null;
          full_name: string | null;
          phone_number: string | null;
          avatar_url: string | null;
          is_host: boolean;
          created_at: string;
          updated_at: string;
          provider: string | null;
          provider_id: string | null;
          metadata: Json | null;
        };
        Insert: {
          id: string;
          aud?: string;
          email?: string | null;
          full_name?: string | null;
          phone_number?: string | null;
          avatar_url?: string | null;
          is_host?: boolean;
          created_at?: string;
          updated_at?: string;
          provider?: string | null;
          provider_id?: string | null;
          metadata?: Json | null;
        };
        Update: {
          id?: string;
          aud?: string;
          email?: string | null;
          full_name?: string | null;
          phone_number?: string | null;
          avatar_url?: string | null;
          is_host?: boolean;
          created_at?: string;
          updated_at?: string;
          provider?: string | null;
          provider_id?: string | null;
          metadata?: Json | null;
        };
      };
      categories: {
        Row: {
          id: string;
          name: string;
          description: string | null;
          icon_url: string | null;
        };
        Insert: {
          id?: string;
          name: string;
          description?: string | null;
          icon_url?: string | null;
        };
        Update: {
          id?: string;
          name?: string;
          description?: string | null;
          icon_url?: string | null;
        };
      };
      spaces: {
        Row: {
          id: string;
          host_id: string;
          category_id: string;
          name: string;
          description: string | null;
          address: string;
          detailed_address: string | null;
          latitude: number | null;
          longitude: number | null;
          max_capacity: number | null;
          base_price: number;
          minimum_hours: number;
          amenities: Json | null;
          rules: string[] | null;
          status: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          host_id: string;
          category_id: string;
          name: string;
          description?: string | null;
          address: string;
          detailed_address?: string | null;
          latitude?: number | null;
          longitude?: number | null;
          max_capacity?: number | null;
          base_price: number;
          minimum_hours?: number;
          amenities?: Json | null;
          rules?: string[] | null;
          status?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          host_id?: string;
          category_id?: string;
          name?: string;
          description?: string | null;
          address?: string;
          detailed_address?: string | null;
          latitude?: number | null;
          longitude?: number | null;
          max_capacity?: number | null;
          base_price?: number;
          minimum_hours?: number;
          amenities?: Json | null;
          rules?: string[] | null;
          status?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      space_images: {
        Row: {
          id: string;
          space_id: string;
          image_url: string;
          is_primary: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          space_id: string;
          image_url: string;
          is_primary?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          space_id?: string;
          image_url?: string;
          is_primary?: boolean;
          created_at?: string;
        };
      };
      operating_hours: {
        Row: {
          id: string;
          space_id: string;
          day_of_week: number;
          open_time: string | null;
          close_time: string | null;
          is_closed: boolean;
        };
        Insert: {
          id?: string;
          space_id: string;
          day_of_week: number;
          open_time?: string | null;
          close_time?: string | null;
          is_closed?: boolean;
        };
        Update: {
          id?: string;
          space_id?: string;
          day_of_week?: number;
          open_time?: string | null;
          close_time?: string | null;
          is_closed?: boolean;
        };
      };
      bookings: {
        Row: {
          id: string;
          space_id: string;
          user_id: string;
          start_time: string;
          end_time: string;
          total_price: number;
          status: string;
          guest_count: number | null;
          special_requests: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          space_id: string;
          user_id: string;
          start_time: string;
          end_time: string;
          total_price: number;
          status?: string;
          guest_count?: number | null;
          special_requests?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          space_id?: string;
          user_id?: string;
          start_time?: string;
          end_time?: string;
          total_price?: number;
          status?: string;
          guest_count?: number | null;
          special_requests?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      reviews: {
        Row: {
          id: string;
          booking_id: string;
          user_id: string;
          space_id: string;
          rating: number;
          content: string | null;
          images: string[] | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          booking_id: string;
          user_id: string;
          space_id: string;
          rating: number;
          content?: string | null;
          images?: string[] | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          booking_id?: string;
          user_id?: string;
          space_id?: string;
          rating?: number;
          content?: string | null;
          images?: string[] | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      favorites: {
        Row: {
          id: string;
          user_id: string;
          space_id: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          space_id: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          space_id?: string;
          created_at?: string;
        };
      };
      payments: {
        Row: {
          id: string;
          booking_id: string;
          amount: number;
          payment_method: string | null;
          payment_status: string;
          transaction_id: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          booking_id: string;
          amount: number;
          payment_method?: string | null;
          payment_status?: string;
          transaction_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          booking_id?: string;
          amount?: number;
          payment_method?: string | null;
          payment_status?: string;
          transaction_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      user_role: 'guest' | 'host' | 'admin';
    };
  };
}

export interface KakaoUserMetadata {
  avatar_url: string;
  email: string;
  email_verified: boolean;
  full_name: string;
  iss: string;
  name: string;
  picture: string;
  provider_id: string;
  sub: string;
}

export type SupabaseUser = {
  id: string;
  aud: string;
  role: string;
  email?: string;
  email_confirmed_at?: string;
  phone?: string;
  confirmed_at?: string;
  last_sign_in_at?: string;
  app_metadata: {
    provider?: string;
    providers?: string[];
  };
  user_metadata: KakaoUserMetadata;
  identities?: {
    id: string;
    user_id: string;
    identity_data: {
      avatar_url: string;
      email: string;
      full_name: string;
      provider_id: string;
      sub: string;
    };
    provider: string;
    last_sign_in_at: string;
    created_at: string;
    updated_at: string;
  }[];
  created_at: string;
  updated_at: string;
};
