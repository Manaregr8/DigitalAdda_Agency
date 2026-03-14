"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import BlogEditor from "@/components/BlogEditor";
import { withAdminCsrf } from "@/lib/client-csrf";
import styles from "./BlogForm.module.css";

const baseState = {
  title: "",
  slug: "",
  coverImage: "",
  ogImage: "",
  metaTitle: "",
  metaDescription: "",
  tags: "",
  keywords: "",
  schemas: [""],
  content: "",
};

const clientSlugify = (raw = "") =>
  raw
    .toString()
    .normalize("NFKD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");

const slugHelpId = "blog-form-slug-help";
const tagsHelpId = "blog-form-tags-help";

const BlogForm = ({ initialData = null, mode = "create" }) => {
  const router = useRouter();
  const [formValues, setFormValues] = useState(() => ({
    ...baseState,
    ...initialData,
    tags: initialData?.tags?.join(", ") || initialData?.tags || "",
    keywords: initialData?.keywords?.join(", ") || initialData?.keywords || "",
    schemas: Array.isArray(initialData?.schemas) && initialData.schemas.length
      ? initialData.schemas.map((entry) => JSON.stringify(entry, null, 2))
      : [""],
    content: initialData?.content || "",
    ogImage: initialData?.ogImage || "",
    coverImage: initialData?.coverImage || "",
    metaTitle: initialData?.metaTitle || "",
    metaDescription: initialData?.metaDescription || "",
  }));
  const [slugTouched, setSlugTouched] = useState(Boolean(initialData?.slug));
  const [status, setStatus] = useState({ type: null, message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [uploading, setUploading] = useState(false);

  const formTitle = useMemo(() => (mode === "edit" ? "Update Post" : "Create Post"), [mode]);

  useEffect(() => {
    if (!slugTouched && formValues.title) {
      setFormValues((prev) => ({
        ...prev,
        slug: clientSlugify(prev.title) || prev.slug,
      }));
    }
  }, [formValues.title, slugTouched]);

  const setField = (field, value) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));
  };

  const updateSchema = (index, value) => {
    setFormValues((prev) => {
      const next = [...prev.schemas];
      next[index] = value;
      return { ...prev, schemas: next };
    });
  };

  const addSchemaField = () => {
    setFormValues((prev) => ({ ...prev, schemas: [...prev.schemas, ""] }));
  };

  const removeSchemaField = (index) => {
    setFormValues((prev) => {
      const next = prev.schemas.filter((_, currentIndex) => currentIndex !== index);
      return { ...prev, schemas: next.length ? next : [""] };
    });
  };

  const handleFileChange = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setStatus({ type: null, message: "" });

    try {
      const uploadData = new FormData();
      uploadData.append("file", file);
      const response = await fetch(
        "/api/upload",
        withAdminCsrf({
          method: "POST",
          body: uploadData,
        })
      );
      const result = await response.json().catch(() => ({}));
      if (response.status === 401) {
        throw new Error("Session expired. Please sign in again.");
      }
      if (!response.ok) {
        throw new Error(result.error || "Upload failed");
      }
      setField("coverImage", result.url);
      setStatus({ type: "success", message: "Image uploaded" });
    } catch (error) {
      setStatus({ type: "error", message: error.message });
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setStatus({ type: null, message: "" });

    try {
      if (!formValues.title.trim() || !formValues.content.trim()) {
        throw new Error("Title and content are required");
      }

      const payload = {
        title: formValues.title.trim(),
        slug: formValues.slug.trim() || clientSlugify(formValues.title),
        coverImage: formValues.coverImage?.trim() || "",
        ogImage: formValues.ogImage?.trim() || "",
        metaTitle: formValues.metaTitle?.trim() || "",
        metaDescription: formValues.metaDescription?.trim() || "",
        tags: formValues.tags,
        keywords: formValues.keywords,
        schemas: formValues.schemas.filter((entry) => entry.trim()).map((entry) => JSON.parse(entry)),
        content: formValues.content,
      };

      const isEdit = mode === "edit" && initialData?.id;
      const endpoint = isEdit ? `/api/admin/blog/${initialData.id}` : "/api/admin/blog";
      const method = isEdit ? "PUT" : "POST";

      const response = await fetch(
        endpoint,
        withAdminCsrf({
          method,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        })
      );

      const result = await response.json().catch(() => ({}));

      if (response.status === 401) {
        throw new Error("Session expired. Please sign in again.");
      }
      if (!response.ok) {
        throw new Error(result.error || "Unable to save blog");
      }

      setStatus({ type: "success", message: isEdit ? "Post updated" : "Post created" });
      router.push("/admin/blogs");
      router.refresh();
    } catch (error) {
      setStatus({ type: "error", message: error.message });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit} aria-busy={submitting || uploading}>
      <header className={styles.formHeader}>
        <h2>{formTitle}</h2>
        <p>Use the editor below to manage the blog content that powers every site.</p>
      </header>

      <div className={styles.formGrid}>
        <label>
          Title
          <input
            type="text"
            name="title"
            required
            value={formValues.title}
            onChange={(event) => setField("title", event.target.value)}
          />
        </label>

        <label>
          Slug
          <input
            type="text"
            name="slug"
            value={formValues.slug}
            onChange={(event) => {
              setSlugTouched(true);
              setField("slug", clientSlugify(event.target.value));
            }}
            aria-describedby={slugHelpId}
          />
          <small id={slugHelpId}>Auto-generated from the title, but you can override it.</small>
        </label>

        <label>
          Meta Title (SEO)
          <input
            type="text"
            name="metaTitle"
            placeholder="50-60 characters recommended"
            maxLength="60"
            value={formValues.metaTitle}
            onChange={(event) => setField("metaTitle", event.target.value)}
          />
          <small>Optimized title for search engines (50-60 chars). If empty, uses the main title.</small>
        </label>

        <label>
          Meta Description (SEO)
          <textarea
            name="metaDescription"
            placeholder="150-160 characters recommended"
            maxLength="160"
            rows="3"
            value={formValues.metaDescription}
            onChange={(event) => setField("metaDescription", event.target.value)}
          />
          <small>Brief summary for search results and social media (150-160 chars).</small>
        </label>

        <label>
          Tags
          <input
            type="text"
            name="tags"
            placeholder="marketing, release, seo"
            value={formValues.tags}
            onChange={(event) => setField("tags", event.target.value)}
            aria-describedby={tagsHelpId}
          />
          <small id={tagsHelpId}>Comma-separated. Used for filtering and related posts.</small>
        </label>

        <label>
          Keywords
          <input
            type="text"
            name="keywords"
            placeholder="web design, ui ux, development"
            value={formValues.keywords}
            onChange={(event) => setField("keywords", event.target.value)}
          />
          <small>Comma-separated SEO keywords.</small>
        </label>

        <label>
          Cover Image URL
          <input
            type="text"
            name="coverImage"
            placeholder="https://"
            value={formValues.coverImage}
            onChange={(event) => setField("coverImage", event.target.value)}
          />
        </label>

        <label>
          OG Image URL (Social Sharing)
          <input
            type="text"
            name="ogImage"
            placeholder="https://"
            value={formValues.ogImage}
            onChange={(event) => setField("ogImage", event.target.value)}
          />
          <small>Specific image for social media previews. If empty, uses cover image.</small>
        </label>

        <label>
          Or upload an image
          <input type="file" accept="image/png,image/jpeg,image/webp" onChange={handleFileChange} disabled={uploading} />
          <small>
            {uploading
              ? "Uploading..."
              : "Only JPEG, PNG, or WebP files are accepted. Images are hosted via ImgBB."}
          </small>
        </label>
      </div>

      <section className={styles.schemaSection}>
        <div className={styles.schemaHeader}>
          <h3>Structured Data Schemas (JSON-LD)</h3>
          <button type="button" onClick={addSchemaField} className={styles.secondaryButton}>
            + Add Schema
          </button>
        </div>
        {formValues.schemas.map((schema, index) => (
          <div key={`${index}-schema`} className={styles.schemaItem}>
            <textarea
              rows={6}
              value={schema}
              onChange={(event) => updateSchema(index, event.target.value)}
              placeholder='{"@context":"https://schema.org","@type":"BlogPosting"}'
            />
            <button type="button" onClick={() => removeSchemaField(index)} className={styles.removeButton}>
              Remove
            </button>
          </div>
        ))}
      </section>

      <label className={styles.editorLabel}>
        Content
        <BlogEditor value={formValues.content} onChange={(html) => setField("content", html)} />
      </label>

      {status.message ? (
        <p
          className={`${styles.formStatus} ${status.type === "error" ? styles.error : styles.success}`}
          role={status.type === "error" ? "alert" : "status"}
          aria-live={status.type === "error" ? "assertive" : "polite"}
        >
          {status.message}
        </p>
      ) : null}

      <div className={styles.formActions}>
        <button type="submit" className={styles.primaryButton} disabled={submitting || uploading}>
          {submitting ? "Saving..." : formTitle}
        </button>
      </div>
    </form>
  );
};

export default BlogForm;
