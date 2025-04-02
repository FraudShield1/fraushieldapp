import { ButtonHTMLAttributes, forwardRef, ReactNode } from 'react'
import { cn } from '../lib/utils'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'warning' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  children: ReactNode
  loading?: boolean
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, loading = false, disabled, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'
    
    const variants = {
      primary: 'bg-primary text-white hover:bg-primary/90 focus:ring-primary/50',
      secondary: 'bg-secondary/10 text-text hover:bg-secondary/20 focus:ring-secondary/50',
      danger: 'bg-danger/10 text-danger hover:bg-danger/20 focus:ring-danger/50',
      success: 'bg-success/10 text-success hover:bg-success/20 focus:ring-success/50',
      warning: 'bg-warning/10 text-warning hover:bg-warning/20 focus:ring-warning/50',
      ghost: 'text-text-secondary hover:text-text hover:bg-secondary/5 focus:ring-secondary/50'
    }

    const sizes = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-6 py-3 text-lg'
    }

    return (
      <button
        ref={ref}
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          className
        )}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        ) : null}
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button' 