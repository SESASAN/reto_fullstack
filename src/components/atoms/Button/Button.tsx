import { cn } from '@/styles/cn'

import { BUTTON_SIZES, BUTTON_VARIANTS } from './Button.constants'
import type { ButtonProps, ButtonSize, ButtonVariant } from './Button.types'

const base =
  'inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50'

const variantClass: Record<ButtonVariant, string> = {
  primary:
    'bg-obsidian-primary text-on-primary shadow-lg shadow-primary/20 hover:shadow-primary/30',
  secondary:
    'border border-outline-variant/30 bg-surface-container-low text-on-surface hover:bg-surface-container-high',
  ghost: 'text-on-surface/80 hover:text-primary hover:bg-surface-container-low',
  danger:
    'bg-error-container text-on-error-container hover:brightness-110 shadow-lg shadow-black/30',
}

const sizeClass: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-sm',
  lg: 'px-8 py-4 text-base',
}

export function Button({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className,
  type,
  ...props
}: ButtonProps) {
  // Defensive: keep allowed values in runtime too
  const safeVariant = (BUTTON_VARIANTS as readonly string[]).includes(variant)
    ? variant
    : 'primary'
  const safeSize = (BUTTON_SIZES as readonly string[]).includes(size) ? size : 'md'

  return (
    <button
      type={type ?? 'button'}
      className={cn(
        base,
        variantClass[safeVariant],
        sizeClass[safeSize],
        fullWidth && 'w-full',
        className,
      )}
      {...props}
    />
  )
}
