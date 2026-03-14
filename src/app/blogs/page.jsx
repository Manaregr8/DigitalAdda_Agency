import BlogCard from "@/components/BlogCard";
import prisma from "@/lib/prisma";
import styles from "./page.module.css";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Blogs",
  description: "Latest articles from our editorial team."
};

export default async function BlogsPage() {
  const blogs = await prisma.blog.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      title: true,
      slug: true,
      metaDescription: true,
      tags: true,
      coverImage: true,
      content: true,
      createdAt: true
    }
  });

  return (
    <main className={styles.page} id="main-content" role="main">
      <section className={styles.hero}>
        <p>Blog Library</p>
        <h1>Insights and Playbooks</h1>
      </section>
      {blogs.length ? (
        <section className={styles.grid}>
          {blogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </section>
      ) : (
        <p className={styles.empty}>No posts published yet.</p>
      )}
    </main>
  );
}
