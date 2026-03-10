import { redirect } from "next/navigation";

export default function LegacyCreateBlogPage() {
  redirect("/admin/blogs/create");
}
