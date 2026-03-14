import { redirect } from "next/navigation";

export default function LegacyBlogListPage() {
  redirect("/blogs");
}
