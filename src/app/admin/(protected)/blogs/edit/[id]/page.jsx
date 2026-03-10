import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import BlogForm from "@/components/BlogForm";

export const metadata = {
  title: "Edit Blog"
};

export default async function EditBlogPage({ params }) {
  const { id } = await params;

  const blog = await prisma.blog.findUnique({ where: { id } });
  if (!blog) {
    notFound();
  }

  return (
    <section className="admin-panel">
      <BlogForm mode="edit" initialData={blog} />
    </section>
  );
}
