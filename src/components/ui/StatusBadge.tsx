interface StatusBadgeProps {
  status: 'draft' | 'published' | 'archived'
}

const statusConfig = {
  draft: {
    label: 'Draft',
    className: 'bg-yellow-100 text-yellow-800 border border-yellow-200',
  },
  published: {
    label: 'Published',
    className: 'bg-green-100 text-green-800 border border-green-200',
  },
  archived: {
    label: 'Archived',
    className: 'bg-gray-100 text-gray-700 border border-gray-200',
  },
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const config = statusConfig[status]
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.className}`}
    >
      {config.label}
    </span>
  )
}
