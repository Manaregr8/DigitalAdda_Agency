import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { ensureAdminApi } from "@/lib/auth";

export async function GET(request) {
  try {
    const session = await ensureAdminApi(request, { requireCsrf: false });
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const blogs = await prisma.blog.findMany({
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        title: true,
        slug: true,
        tags: true,
        createdAt: true,
        updatedAt: true
      }
    });

    return NextResponse.json({ data: blogs });
  } catch (error) {
    console.error("GET /api/admin/blogs failed", error);
    return NextResponse.json({ error: "Unable to fetch admin blogs" }, { status: 500 });
  }
}
