import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const blogs = await prisma.blog.findMany({
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        title: true,
        slug: true,
        metaDescription: true,
        tags: true,
        coverImage: true,
        createdAt: true
      }
    });

    return NextResponse.json({ data: blogs });
  } catch (error) {
    console.error("GET /api/blogs failed", error);
    return NextResponse.json({ error: "Unable to fetch blogs" }, { status: 500 });
  }
}
