export interface Track {
  id?: number;
  number: number;
  title: string;
  lyrics?: string | null;
  video?: string | null;
}

export interface Album {
  id?: number;
  title: string;
  artist: string;
  year: number;
  image?: string | null;
  description?: string | null;
  tracks?: Track[];
}

export interface User {
  id?: number;
  email: string;
  role: 'customer' | 'admin';
  created_at?: string;
}

export interface Review {
  id?: number;
  track_id: number;
  user_id: number;
  rating: number;
  comment?: string;
  is_hidden?: boolean;
  created_at?: string;
  updated_at?: string;
}
