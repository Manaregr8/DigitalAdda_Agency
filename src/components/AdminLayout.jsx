import Link from "next/link";
import AdminLogoutButton from "@/components/AdminLogoutButton";
import "@/styles/admin.css";

const AdminLayout = ({ children }) => (
  <div className="admin-shell">
    <aside className="admin-nav">
      <h2>Admin</h2>
      <nav>
        <Link href="/admin/dashboard">Dashboard</Link>
        <Link href="/admin/blogs">All Posts</Link>
        <Link href="/admin/blogs/create">Create Post</Link>
      </nav>
      <AdminLogoutButton />
      <Link href="/blogs" className="admin-nav__link">
        ← Back to site
      </Link>
    </aside>
    <main id="main-content" className="admin-main" role="main">
      {children}
    </main>
  </div>
);

export default AdminLayout;
