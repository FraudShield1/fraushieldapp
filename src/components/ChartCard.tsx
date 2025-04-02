import { ReactNode } from 'react'
import clsx from 'clsx'

interface ChartCardProps {
  title: string
  children: ReactNode
  className?: string
}

export function ChartCard({ title, children, className }: ChartCardProps) {
  return (
    <div className={clsx('card', className)}>
      <h3 className="text-lg font-semibold mb-6 text-text">{title}</h3>
      <div className="h-64 bg-background rounded-lg border border-border/50 p-4">
        {children}
      </div>
    </div>
  )
} 