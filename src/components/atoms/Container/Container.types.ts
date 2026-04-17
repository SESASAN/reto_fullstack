import type { ElementType, HTMLAttributes, ReactNode } from 'react'

export type ContainerProps<TAs extends ElementType = 'div'> = {
  as?: TAs
  children?: ReactNode
  className?: string
} & Omit<HTMLAttributes<HTMLElement>, 'className'>
