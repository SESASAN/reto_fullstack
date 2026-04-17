import { forwardRef } from 'react'

import { cn } from '@/styles/cn'

import type { InputProps, InputSize } from './Input.types'

const base =
  'w-full rounded-lg bg-surface-container-lowest px-4 text-sm text-on-surface placeholder:text-outline/50 outline-none transition-all'

const sizeClass: Record<InputSize, string> = {
  sm: 'py-2',
  md: 'py-3',
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { size = 'md', error, className, ...props },
  ref,
) {
  return (
    <div className="w-full">
      <input
        ref={ref}
        className={cn(
          base,
          sizeClass[size],
          'border',
          error
            ? 'border-error focus:ring-2 focus:ring-error/30'
            : 'border-outline-variant/20 focus:ring-2 focus:ring-primary/30 focus:border-primary/50',
          className,
        )}
        {...props}
      />
      {error ? (
        <p className="mt-2 text-xs text-error">{error}</p>
      ) : null}
    </div>
  )
})
