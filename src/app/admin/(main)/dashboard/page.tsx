import { redirect } from 'next/navigation'
import Link from 'next/link'
import prisma from '@/lib/prisma'
import { isAuthenticated } from '@/lib/auth-jwt'
import { BlogPost } from '@/types/blog'
import StatusBadge from '@/components/ui/StatusBadge'
import { formatDate } from '@/lib/utils'
import { PenSquare, FileText, CheckCircle, Archive, Clock } from 'lucide-react'

export const dynamic = 'force-dynamic'

async function getStats() {
  const [total, recent] = await Promise.all([
    prisma.blog.count(),
    prisma.blog.findMany({
      select: { id: true, title: true, slug: true, createdAt: true },
      orderBy: { createdAt: 'desc' },
      take: 5
    })
  ]);

  return {
    total,
    published: total,
    draft: 0,
    archived: 0,
    recent: recent.map((r: any) => ({
      id: r.id,
      title: r.title,
      slug: r.slug,
      status: 'published',
      published_at: r.createdAt.toISOString(),
      created_at: r.createdAt.toISOString()
    })) as Pick<
      BlogPost,
      'id' | 'title' | 'status' | 'published_at' | 'created_at' | 'slug'
    >[],
  }
}

export default async function DashboardPage() {
  const authed = await isAuthenticated()
  if (!authed) redirect('/admin/login')

  const stats = await getStats()

  const statCards = [
    { label: 'Total Posts', value: stats.total, icon: FileText, color: 'text-blue-600 bg-blue-50' },
    { label: 'Published', value: stats.published, icon: CheckCircle, color: 'text-green-600 bg-green-50' },
    { label: 'Drafts', value: stats.draft, icon: Clock, color: 'text-yellow-600 bg-yellow-50' },
    { label: 'Archived', value: stats.archived, icon: Archive, color: 'text-gray-600 bg-gray-100' },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-sm text-gray-500 mt-0.5">Overview of your blog</p>
        </div>
        <Link
          href="/admin/blogs/create"
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <PenSquare className="w-4 h-4" />
          New Post
        </Link>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {statCards.map(({ label, value, icon: Icon, color }) => (
          <div
            key={label}
            className="bg-white border border-gray-200 rounded-xl shadow-sm p-5 flex items-center gap-4"
          >
            <div className={`rounded-lg p-2.5 ${color}`}>
              <Icon className="w-5 h-5" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{value}</p>
              <p className="text-sm text-gray-500">{label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Posts */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h2 className="text-base font-semibold text-gray-900">Recent Posts</h2>
          <Link
            href="/admin/blogs"
            className="text-sm text-blue-600 hover:text-blue-700 transition-colors"
          >
            View all →
          </Link>
        </div>

        {stats.recent.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <p>No posts yet.</p>
            <Link
              href="/admin/blogs/create"
              className="mt-2 inline-block text-sm text-blue-600 hover:underline"
            >
              Create your first post
            </Link>
          </div>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                  Date
                </th>
                <th className="px-6 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {stats.recent.map((post) => (
                <tr key={post.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-3 text-sm font-medium text-gray-900 max-w-[300px] truncate">
                    {post.title}
                  </td>
                  <td className="px-6 py-3">
                    <StatusBadge status={post.status} />
                  </td>
                  <td className="px-6 py-3 text-sm text-gray-500">
                    {formatDate(post.published_at ?? post.created_at)}
                  </td>
                  <td className="px-6 py-3 text-right">
                    <Link
                      href={`/admin/blogs/edit/${post.id}`}
                      className="text-xs text-blue-600 hover:underline"
                    >
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
