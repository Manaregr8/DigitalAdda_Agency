import { redirect } from 'next/navigation'
import { getAuthToken, verifyToken } from '@/lib/auth-jwt'
import AdminSidebar from './AdminSidebar'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const token = await getAuthToken()

  if (!token) {
    redirect('/admin/login')
  }

  const payload = await verifyToken(token)

  if (!payload) {
    redirect('/admin/login')
  }

  const adminEmail = (payload.email as string) ?? 'admin'

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar adminEmail={adminEmail} />
      <main className="flex-1 p-6 md:p-8 overflow-auto">
        {children}
      </main>
    </div>
  )
}
