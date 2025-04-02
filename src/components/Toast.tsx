import { useEffect } from 'react'
import { Badge } from './Badge'

interface ToastProps {
  message: string
  type?: 'success' | 'error' | 'warning' | 'info'
  onClose: () => void
  duration?: number
}

export function Toast({ message, type = 'info', onClose, duration = 3000 }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, duration)
    return () => clearTimeout(timer)
  }, [duration, onClose])

  const badgeVariant = type === 'error' ? 'danger' : type === 'info' ? 'secondary' : type

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="bg-card border border-border rounded-lg shadow-lg p-4 flex items-center space-x-3">
        <Badge variant={badgeVariant}>{type}</Badge>
        <p className="text-sm">{message}</p>
        <button
          onClick={onClose}
          className="text-text-secondary hover:text-text"
        >
          ✕
        </button>
      </div>
    </div>
  )
} 