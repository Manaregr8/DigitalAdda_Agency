'use client'

import PostList from '@/components/posts/PostList'

export default function AdminBlogsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Blog Posts</h1>
          <p className="text-sm text-gray-500 mt-0.5">Manage your blog content and SEO</p>
        </div>
      </div>
      <PostList />
    </div>
  )
}
