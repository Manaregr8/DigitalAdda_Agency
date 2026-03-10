import prisma from "@/lib/prisma";

const cardStyle = {
  background: "#fff",
  border: "1px solid #d7deea",
  borderRadius: "12px",
  padding: "1rem"
};

export default async function AdminDashboardPage() {
  const [blogCount, latestPost] = await Promise.all([
    prisma.blog.count(),
    prisma.blog.findFirst({ orderBy: { createdAt: "desc" }, select: { title: true, createdAt: true } })
  ]);

  return (
    <section className="admin-panel">
      <header className="admin-panel__header">
        <div>
          <p className="eyebrow">Admin Dashboard</p>
          <h1>Overview</h1>
          <p>Quick snapshot of your content inventory.</p>
        </div>
      </header>
      <div style={{ display: "grid", gap: "1rem", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>
        <article style={cardStyle}>
          <h3>Total Blogs</h3>
          <p style={{ fontSize: "2rem", margin: 0 }}>{blogCount}</p>
        </article>
        <article style={cardStyle}>
          <h3>Latest Post</h3>
          <p style={{ marginBottom: "0.3rem" }}>{latestPost?.title || "No posts yet"}</p>
          <small>{latestPost ? new Date(latestPost.createdAt).toLocaleDateString() : "-"}</small>
        </article>
      </div>
    </section>
  );
}
