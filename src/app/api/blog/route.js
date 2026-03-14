import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// Legacy endpoint kept for backward compatibility. Prefer /api/blogs.
export async function GET() {
  try {
    const blogs = await prisma.blog.findMany({ orderBy: { createdAt: "desc" } });
    return NextResponse.json({ data: blogs });
  } catch (error) {
    console.error("GET /api/blog failed", error);
    return NextResponse.json({ error: "Unable to fetch blogs" }, { status: 500 });
  }
}
