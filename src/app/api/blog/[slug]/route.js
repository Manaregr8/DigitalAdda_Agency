import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request, { params }) {
  try {
    const { slug } = await params;
    const blog = await prisma.blog.findUnique({ where: { slug } });

    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json({ data: blog });
  } catch (error) {
    console.error("GET /api/blog/[slug] failed", error);
    return NextResponse.json({ error: "Unable to fetch blog" }, { status: 500 });
  }
}
