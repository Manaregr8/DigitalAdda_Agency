import Link from "next/link";
import prisma from "@/lib/prisma";
import DeleteBlogButton from "@/components/DeleteBlogButton";

const formatDate = (value) => new Intl.DateTimeFormat("en", { dateStyle: "medium" }).format(new Date(value));

export default async function AdminBlogsPage() {
  const blogs = await prisma.blog.findMany({
    orderBy: { createdAt: "desc" },
    select: { id: true, title: true, slug: true, tags: true, createdAt: true }
  });

  return (
    <section className="admin-panel">
      <header className="admin-panel__header">
        <div>
          <p className="eyebrow">Content Hub</p>
          <h1>Blogs</h1>
          <p>Create, update, and remove published articles.</p>
        </div>
        <Link href="/admin/blogs/create" className="btn btn--primary">
          Create Post
        </Link>
      </header>

      {blogs.length ? (
        <table className="admin-table">
          <thead>
            <tr>
              <th>Post</th>
              <th>Tags</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((blog) => (
              <tr key={blog.id}>
                <td>
                  <p className="admin-table__title">{blog.title}</p>
                  <p className="admin-table__meta">{formatDate(blog.createdAt)}</p>
                </td>
                <td>{blog.tags?.length ? blog.tags.join(", ") : "-"}</td>
                <td className="admin-table__actions">
                  <Link href={`/blog/${blog.slug}`} className="btn btn--ghost" target="_blank" rel="noreferrer">
                    View
                  </Link>
                  <Link href={`/admin/blogs/edit/${blog.id}`} className="btn">
                    Edit
                  </Link>
                  <DeleteBlogButton id={blog.id} title={blog.title} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="empty">No posts yet. Click Create Post to publish your first article.</p>
      )}
    </section>
  );
}
