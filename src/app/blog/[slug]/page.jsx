import Image from "next/image";
import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import { stripHtml } from "@/lib/sanitize";
import styles from "./page.module.css";

export const dynamic = "force-dynamic";

const getBlogBySlug = async (slug) =>
  prisma.blog.findUnique({
    where: { slug }
  });

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  if (!blog) {
    return { title: "Blog Not Found" };
  }

  const title = blog.metaTitle || blog.title;
  const description = blog.metaDescription || stripHtml(blog.content).slice(0, 160);
  const image = blog.ogImage || blog.coverImage || undefined;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: image ? [{ url: image }] : undefined,
      type: "article"
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: image ? [image] : undefined
    }
  };
}

export default async function BlogDetailsPage({ params }) {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  if (!blog) {
    notFound();
  }

  return (
    <main className={styles.page} id="main-content" role="main">
      <article className={styles.article}>
        <header className={styles.header}>
          <h1>{blog.title}</h1>
          {blog.tags?.length ? <p className={styles.tags}>{blog.tags.join(" | ")}</p> : null}
        </header>

        {blog.coverImage ? (
          <div className={styles.cover}>
            <Image
              src={blog.coverImage}
              alt={blog.title}
              fill
              sizes="(max-width: 900px) 100vw, 900px"
              unoptimized
              style={{ objectFit: "cover" }}
            />
          </div>
        ) : null}

        <section className={styles.content} dangerouslySetInnerHTML={{ __html: blog.content }} />
      </article>

      {Array.isArray(blog.schemas)
        ? blog.schemas.map((schema, index) => (
            <script
              key={`schema-${index}`}
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
            />
          ))
        : null}
    </main>
  );
}
