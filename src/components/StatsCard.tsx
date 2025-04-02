import { ReactNode } from 'react'
import clsx from 'clsx'

interface StatsCardProps {
  title: string
  value: string | number
  change?: {
    value: number
    isPositive?: boolean
  }
  icon?: ReactNode
  className?: string
}

export function StatsCard({
  title,
  value,
  change,
  icon,
  className,
}: StatsCardProps) {
  return (
    <div className={clsx('bg-slate-light rounded-lg p-6 shadow-lg', className)}>
      <div className="flex items-center justify-between">
        <h3 className="text-gray-400">{title}</h3>
        {icon && <div className="text-gray-400">{icon}</div>}
      </div>
      <p className="text-3xl font-bold mt-2">{value}</p>
      {change && (
        <div
          className={clsx('flex items-center mt-2 text-sm', {
            'text-green-400': change.isPositive,
            'text-red-400': !change.isPositive,
          })}
        >
          <span>{change.isPositive ? '+' : ''}{change.value}%</span>
        </div>
      )}
    </div>
  )
} 