import type { InputHTMLAttributes } from 'react'

export type InputSize = 'sm' | 'md'

export type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> & {
  size?: InputSize
  error?: string
  label?: string
}
