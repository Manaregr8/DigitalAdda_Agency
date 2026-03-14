import BlogForm from "@/components/BlogForm";

export const metadata = {
  title: "Create Blog"
};

export default function CreateBlogPage() {
  return (
    <section className="admin-panel">
      <BlogForm mode="create" />
    </section>
  );
}
