import Link from "next/link";
import Image from "next/image";
import styles from "./BlogCard.module.css";

const formatDate = (value) =>
  new Intl.DateTimeFormat("en", { dateStyle: "medium" }).format(new Date(value));

const toExcerpt = (html) => {
  if (!html) return "";
  const text = html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  if (!text) return "";
  return text.length > 160 ? `${text.slice(0, 160)}...` : text;
};

const BlogCard = ({ blog }) => {
  if (!blog) return null;
  const rawCover = blog.coverImage?.trim();
  const isExternalCover = Boolean(rawCover && /^(https?:)?\/\//i.test(rawCover));
  const hasCover = Boolean(rawCover);
  const cover = hasCover ? rawCover : "/placeholder.svg";
  const description = blog.metaDescription || toExcerpt(blog.content);

  return (
    <article className={styles.card}>
      <Link
        href={`/blog/${blog.slug}`}
        className={`${styles.imageWrap} ${hasCover ? "" : styles.placeholder}`}
        aria-label={`Read ${blog.title}`}
      >
        <Image
          src={cover}
          alt={blog.title}
          fill
          sizes="(max-width: 600px) 100vw, (max-width: 1200px) 320px, 360px"
          priority={false}
          style={{ objectFit: "cover" }}
          unoptimized={isExternalCover}
        />
        {!hasCover ? <span className={styles.placeholderText}>No cover image</span> : null}
      </Link>
      <div className={styles.body}>
        <div className={styles.meta}>
          <span>{formatDate(blog.createdAt)}</span>
          <span>&bull;</span>
          <span>{blog.tags?.slice(0, 2).join(" • ") || "General"}</span>
        </div>
        <h3>
          <Link href={`/blog/${blog.slug}`}>{blog.title}</Link>
        </h3>
        <p>{description}</p>
        <Link href={`/blog/${blog.slug}`} className={styles.cta}>
          Read more
        </Link>
      </div>
    </article>
  );
};

export default BlogCard;
