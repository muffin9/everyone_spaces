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

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: Profile;
        Insert: Omit<Profile, 'id' | 'updated_at'>;
        Update: Partial<Omit<Profile, 'id'>>;
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
          amenities: Record<string, any> | null;
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
          amenities?: Record<string, any> | null;
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
          amenities?: Record<string, any> | null;
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
      [_ in never]: never;
    };
  };
}
