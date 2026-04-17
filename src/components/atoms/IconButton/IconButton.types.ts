import type { ButtonHTMLAttributes, ReactNode } from 'react'

export type IconButtonSize = 'sm' | 'md'

export type IconButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'children'
> & {
  ariaLabel: string
  icon: ReactNode
  size?: IconButtonSize
}
