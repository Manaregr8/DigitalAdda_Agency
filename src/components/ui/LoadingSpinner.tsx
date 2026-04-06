interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg'
}

const sizeClasses = {
  sm: 'w-4 h-4 border-2',
  md: 'w-6 h-6 border-2',
  lg: 'w-8 h-8 border-3',
}

export default function LoadingSpinner({ size = 'md' }: LoadingSpinnerProps) {
  return (
    <span
      className={`inline-block rounded-full border-gray-300 border-t-blue-600 animate-spin ${sizeClasses[size]}`}
      role="status"
      aria-label="Loading"
    />
  )
}
