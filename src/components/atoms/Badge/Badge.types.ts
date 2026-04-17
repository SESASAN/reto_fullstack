import type { HTMLAttributes, ReactNode } from 'react'

export type BadgeVariant = 'default' | 'primary'

export type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  children: ReactNode
  variant?: BadgeVariant
}
