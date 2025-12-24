export interface Category {
  id: number;
  name: string;
  slug: string;
  description?: string;
  created_at?: string;
}

export interface Blog {
  id: number;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  category_id?: number;
  category_name?: string;
  category_slug?: string;
  author: string;
  featured_image?: string;
  view_count: number;
  created_at: string;
  updated_at?: string;
}

export interface Video {
  id: number;
  title: string;
  description?: string;
  youtube_id: string;
  category_id?: number;
  category_name?: string;
  category_slug?: string;
  thumbnail_url?: string;
  view_count: number;
  created_at: string;
}

