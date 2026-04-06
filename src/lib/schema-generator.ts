import { BlogPost } from '@/types/blog'

export function generateArticleSchema(post: Partial<BlogPost>, siteUrl: string): string {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.meta_title || post.title || '',
    description: post.meta_description || post.excerpt || '',
    image: post.og_image_url || post.cover_image_url || '',
    author: {
      '@type': 'Person',
      name: post.author_name || 'Admin',
      url: post.author_url || siteUrl,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Admin',
      url: siteUrl,
    },
    datePublished: post.published_at || post.created_at || new Date().toISOString(),
    dateModified: post.updated_at || new Date().toISOString(),
    url: post.canonical_url || `${siteUrl}/blog/${post.slug}`,
    keywords: post.meta_keywords || (post.tags || []).join(', '),
    wordCount: post.word_count || 0,
    inLanguage: 'en',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': post.canonical_url || `${siteUrl}/blog/${post.slug}`,
    },
  }
  return JSON.stringify(schema, null, 2)
}
