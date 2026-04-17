import { cn } from '@/styles/cn'

import type { IconButtonProps, IconButtonSize } from './IconButton.types'

const base =
  'inline-flex items-center justify-center rounded-lg border border-outline-variant/20 bg-surface-container-low text-on-surface/80 transition-colors hover:bg-surface-container-high hover:text-primary active:scale-[0.98]'

const sizeClass: Record<IconButtonSize, string> = {
  sm: 'h-9 w-9',
  md: 'h-10 w-10',
}

export function IconButton({
  ariaLabel,
  icon,
  size = 'md',
  className,
  type,
  ...props
}: IconButtonProps) {
  return (
    <button
      type={type ?? 'button'}
      aria-label={ariaLabel}
      className={cn(base, sizeClass[size], className)}
      {...props}
    >
      {icon}
    </button>
  )
}
