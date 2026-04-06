import { notFound } from 'next/navigation'
import prisma from '@/lib/prisma'
import PostForm from '@/components/posts/PostForm'
import { BlogPost } from '@/types/blog'

interface EditBlogPageProps {
  params: Promise<{ id: string }>
}

export default async function EditBlogPage({ params }: EditBlogPageProps) {
  const { id } = await params

  const post = await prisma.blog.findUnique({
    where: { id },
  })

  if (!post) {
    notFound()
  }

  // Convert Prisma model to BlogPost type
  const initialData: BlogPost = {
    ...post,
    tags: (post.tags as string[]) || [],
    published_at: post.publishedAt?.toISOString() || null,
    created_at: post.createdAt.toISOString(),
    updated_at: post.updatedAt.toISOString(),
    excerpt: post.excerpt || '',
    cover_image_url: post.coverImageUrl || '',
    cover_image_alt: post.coverImageAlt || '',
    category: post.category || '',
    meta_title: post.metaTitle || '',
    meta_description: post.metaDescription || '',
    meta_keywords: post.metaKeywords || '',
    canonical_url: post.canonicalUrl || '',
    og_title: post.ogTitle || '',
    og_description: post.ogDescription || '',
    og_image_url: post.ogImageUrl || '',
    twitter_title: post.twitterTitle || '',
    twitter_description: post.twitterDescription || '',
    twitter_image_url: post.twitterImageUrl || '',
    robots_directive: post.robotsDirective || 'index, follow',
    schema_json: post.schemaJson || '',
    author_name: post.authorName || 'Admin',
    author_url: post.authorUrl || '',
    word_count: post.wordCount || 0,
    read_time: post.readTime || 0,
  }

  return (
    <div className="max-w-5xl mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Edit Blog Post</h1>
        <p className="text-sm text-gray-500 mt-1">Update your content and refine SEO tokens</p>
      </div>
      <PostForm mode="edit" initialData={initialData} postId={id} />
    </div>
  )
}
