import { redirect } from "next/navigation";

export default async function LegacyEditBlogPage({ params }) {
  const { id } = await params;
  redirect(`/admin/blogs/edit/${id}`);
}
