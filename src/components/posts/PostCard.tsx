import Link from 'next/link'
import { Edit, Trash2 } from 'lucide-react'
import { BlogPost } from '@/types/blog'
import StatusBadge from '@/components/ui/StatusBadge'
import { formatDate } from '@/lib/utils'

interface PostCardProps {
  post: BlogPost
  onDelete: (id: string) => void
  onToggleStatus: (post: BlogPost) => void
}

export default function PostCard({ post, onDelete, onToggleStatus }: PostCardProps) {
  return (
    <tr className="hover:bg-gray-50 transition-colors">
      <td className="px-4 py-3">
        <div>
          <p className="text-sm font-medium text-gray-900 line-clamp-2">{post.title}</p>
          <p className="text-xs text-gray-400 mt-0.5">/{post.slug}</p>
        </div>
      </td>
      <td className="px-4 py-3">
        <button type="button" onClick={() => onToggleStatus(post)} title="Click to toggle status">
          <StatusBadge status={post.status} />
        </button>
      </td>
      <td className="px-4 py-3 text-sm text-gray-600">{post.category ?? '—'}</td>
      <td className="px-4 py-3 text-sm text-gray-600">
        {post.published_at ? formatDate(post.published_at) : '—'}
      </td>
      <td className="px-4 py-3 text-sm text-gray-600">{post.word_count ?? 0}</td>
      <td className="px-4 py-3">
        <div className="flex items-center gap-2">
          <Link
            href={`/admin/blogs/edit/${post.id}`}
            className="p-1.5 rounded hover:bg-blue-100 text-gray-600 hover:text-blue-700 transition-colors"
            title="Edit"
          >
            <Edit className="w-4 h-4" />
          </Link>
          <button
            type="button"
            onClick={() => onDelete(post.id)}
            className="p-1.5 rounded hover:bg-red-100 text-gray-600 hover:text-red-700 transition-colors"
            title="Delete"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </td>
    </tr>
  )
}
