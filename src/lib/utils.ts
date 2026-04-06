import slugifyLib from 'slugify'
import { clsx, type ClassValue } from 'clsx'

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}

export function generateSlug(title: string): string {
  return slugifyLib(title, {
    lower: true,
    strict: true,
    trim: true,
  })
}

export function calculateReadTime(content: string): number {
  const text = content.replace(/<[^>]*>/g, '')
  const words = text.trim().split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.ceil(words / 200))
}

export function calculateWordCount(content: string): number {
  const text = content.replace(/<[^>]*>/g, '')
  return text.trim().split(/\s+/).filter(Boolean).length
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}
