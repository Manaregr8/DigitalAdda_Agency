import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const slug = searchParams.get('slug')
    const excludeId = searchParams.get('exclude_id')

    if (!slug) {
      return NextResponse.json({ error: 'slug is required' }, { status: 400 })
    }

    const post = await prisma.blog.findFirst({
      where: {
        AND: [
          { slug: slug },
          excludeId ? { id: { not: excludeId } } : {}
        ]
      },
      select: { id: true }
    })

    return NextResponse.json({ available: !post })
  } catch (error) {
    console.error("Check slug error:", error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
