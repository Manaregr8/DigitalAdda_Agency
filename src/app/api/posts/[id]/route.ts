import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { generateArticleSchema } from '@/lib/schema-generator'
import { calculateReadTime, calculateWordCount } from '@/lib/utils'

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const data = await prisma.blog.findUnique({
      where: { id }
    })

    if (!data) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 })
    }

    return NextResponse.json({ data })
  } catch (error) {
    console.error("GET /api/posts/[id] error:", error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || ''

    const current = await prisma.blog.findUnique({
      where: { id },
      select: { publishedAt: true, status: true }
    })

    if (!current) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 })
    }

    const wordCount = calculateWordCount(body.content ?? '')
    const readTime = calculateReadTime(body.content ?? '')

    let publishedAt = current.publishedAt
    if (body.status === 'published' && !publishedAt) {
      publishedAt = body.published_at ? new Date(body.published_at) : new Date()
    } else if (body.published_at) {
      publishedAt = new Date(body.published_at)
    }

    const updateData: any = {
      title: body.title,
      slug: body.slug,
      excerpt: body.excerpt || null,
      content: body.content,
      status: body.status,
      coverImage: body.cover_image_url || null,
      coverImageAlt: body.cover_image_alt || null,
      category: body.category || null,
      tags: body.tags ?? [],
      metaTitle: body.meta_title || null,
      metaDescription: body.meta_description || null,
      metaKeywords: body.meta_keywords || null,
      canonicalUrl: body.canonical_url || null,
      ogTitle: body.og_title || null,
      ogDescription: body.og_description || null,
      ogImage: body.og_image_url || null,
      twitterTitle: body.twitter_title || null,
      twitterDescription: body.twitter_description || null,
      twitterImage: body.twitter_image_url || null,
      robotsDirective: body.robots_directive ?? 'index, follow',
      authorName: body.author_name ?? 'Admin',
      authorUrl: body.author_url || null,
      wordCount: wordCount,
      readTime: readTime,
      publishedAt,
      schemaJson: '',
    }

    updateData.schemaJson = generateArticleSchema({
      ...updateData,
      og_image_url: updateData.ogImage,
      cover_image_url: updateData.coverImage
    }, siteUrl)

    const updated = await prisma.blog.update({
      where: { id },
      data: updateData
    })

    return NextResponse.json({ data: updated })
  } catch (error) {
    console.error("PUT /api/posts/[id] error:", error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    await prisma.blog.delete({
      where: { id }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("DELETE /api/posts/[id] error:", error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
