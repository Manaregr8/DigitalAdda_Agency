'use client'

import PostForm from '@/components/posts/PostForm'

export default function CreateBlogPage() {
  return (
    <div className="max-w-5xl mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Create New Blog Post</h1>
        <p className="text-sm text-gray-500 mt-1">Write your content and optimize for search engines</p>
      </div>
      <PostForm mode="create" />
    </div>
  )
}
