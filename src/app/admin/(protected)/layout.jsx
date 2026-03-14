import AdminLayout from "@/components/AdminLayout";
import { requireAdminUser } from "@/lib/auth";

export const dynamic = "force-dynamic";

export const metadata = {
  title: {
    default: "Admin Panel",
    template: "%s | Admin Panel"
  }
};

export default async function ProtectedAdminLayout({ children }) {
  await requireAdminUser();
  return <AdminLayout>{children}</AdminLayout>;
}
