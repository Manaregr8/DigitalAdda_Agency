export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string | null
  content: string
  cover_image_url: string | null
  cover_image_alt: string | null
  status: 'draft' | 'published' | 'archived'
  category: string | null
  tags: string[]
  meta_title: string | null
  meta_description: string | null
  meta_keywords: string | null
  canonical_url: string | null
  og_title: string | null
  og_description: string | null
  og_image_url: string | null
  twitter_title: string | null
  twitter_description: string | null
  twitter_image_url: string | null
  robots_directive: string
  schema_json: string | null
  read_time_minutes: number | null
  word_count: number | null
  author_name: string
  author_url: string | null
  created_at: string
  updated_at: string
  published_at: string | null
}

export type BlogPostInsert = Omit<BlogPost, 'id' | 'created_at' | 'updated_at'>
export type BlogPostUpdate = Partial<BlogPostInsert>

export interface PostFormData {
  title: string
  slug: string
  excerpt?: string
  content: string
  cover_image_url?: string
  cover_image_alt?: string
  status: 'draft' | 'published' | 'archived'
  category?: string
  tags: string[]
  meta_title?: string
  meta_description?: string
  meta_keywords?: string
  canonical_url?: string
  og_title?: string
  og_description?: string
  og_image_url?: string
  twitter_title?: string
  twitter_description?: string
  twitter_image_url?: string
  robots_directive: string
  schema_json?: string
  author_name: string
  author_url?: string
  published_at?: string
}

export interface ApiResponse<T = unknown> {
  data?: T
  error?: string
  total?: number
  page?: number
  totalPages?: number
}

export interface UploadResponse {
  url: string
  display_url: string
  thumb_url: string
}
