'use client'

import { useState, useEffect, useRef } from 'react'
import { Check, X, Loader2 } from 'lucide-react'

interface SlugInputProps {
  value: string
  onChange: (slug: string) => void
  postId?: string
}

type SlugStatus = 'idle' | 'checking' | 'available' | 'taken'

function sanitizeSlug(input: string): string {
  return input
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-{2,}/g, '-')
    .replace(/^-|-$/g, '')
}

export default function SlugInput({ value, onChange, postId }: SlugInputProps) {
  const [status, setStatus] = useState<SlugStatus>('idle')
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (!value) {
      setStatus('idle')
      return
    }

    setStatus('checking')

    if (debounceRef.current) clearTimeout(debounceRef.current)

    debounceRef.current = setTimeout(async () => {
      try {
        const params = new URLSearchParams({ slug: value })
        if (postId) params.set('exclude_id', postId)

        const res = await fetch(`/api/posts/check-slug?${params.toString()}`)
        const data = await res.json()

        setStatus(data.available ? 'available' : 'taken')
      } catch {
        setStatus('idle')
      }
    }, 500)

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current)
    }
  }, [value, postId])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const sanitized = sanitizeSlug(e.target.value)
    onChange(sanitized)
  }

  return (
    <div className="relative">
      <div className="flex items-center border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-blue-500 overflow-hidden">
        <span className="px-3 py-2 bg-gray-50 text-gray-500 text-sm border-r border-gray-300 select-none">
          /blog/
        </span>
        <input
          type="text"
          value={value}
          onChange={handleChange}
          placeholder="post-slug"
          className="flex-1 px-3 py-2 text-sm outline-none bg-white"
        />
        <span className="px-3 py-2">
          {status === 'checking' && <Loader2 className="w-4 h-4 animate-spin text-gray-400" />}
          {status === 'available' && <Check className="w-4 h-4 text-green-500" />}
          {status === 'taken' && <X className="w-4 h-4 text-red-500" />}
        </span>
      </div>
      {status === 'taken' && (
        <p className="mt-1 text-xs text-red-600">This slug is already taken</p>
      )}
      {status === 'available' && (
        <p className="mt-1 text-xs text-green-600">Slug is available</p>
      )}
    </div>
  )
}
