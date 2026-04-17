import { cn } from '@/styles/cn'

import type { BadgeProps, BadgeVariant } from './Badge.types'

const base =
  'inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-black tracking-[0.15em] uppercase'

const variantClass: Record<BadgeVariant, string> = {
  default:
    'border border-outline-variant/20 bg-surface-container-highest text-on-surface',
  primary: 'bg-primary text-on-primary',
}

export function Badge({ variant = 'default', className, ...props }: BadgeProps) {
  return <span className={cn(base, variantClass[variant], className)} {...props} />
}
