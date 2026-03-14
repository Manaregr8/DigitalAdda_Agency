export const dynamic = "force-dynamic";
import { getAdminSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import styles from "./page.module.css";
import AdminLoginForm from "@/components/AdminLoginForm";

export const metadata = {
  title: "Admin Login",
};

export default async function AdminLoginPage() {
  const session = await getAdminSession();
  if (session) {
    redirect("/admin/dashboard");
  }

  return (
    <main id="main-content" className={styles.authPage} role="main">
      <div className={styles.authCard}>
        <div className={styles.brandSide}>
          <p className={styles.eyebrow}>Control Center</p>
          <h1>Content Admin Portal</h1>
          <p>
            Sign in with your operator credentials to publish, revise, and deploy content across every brand that
            shares this template.
          </p>
          <ul>
            <li>Secure session-based access with audit-ready logging.</li>
            <li>Consistent publishing workflow powered by Prisma.</li>
            <li>Responsive admin surface crafted for focused writing.</li>
          </ul>
        </div>
        <div className={styles.formSide}>
          <AdminLoginForm />
          <p className={styles.hint}>
            <Link href="/">← Back to site</Link>
          </p>
        </div>
      </div>
    </main>
  );
}
