import type { ElementType } from 'react'

import { cn } from '@/styles/cn'

import { DEFAULT_MAX_WIDTH } from './Container.constants'
import type { ContainerProps } from './Container.types'

export function Container<TAs extends ElementType = 'div'>(
  props: ContainerProps<TAs>,
) {
  const {
    as,
    className,
    children,
    ...rest
  } = props as ContainerProps<'div'>

  const Comp = (as ?? 'div') as ElementType

  return (
    <Comp
      className={cn('mx-auto px-6 md:px-8', DEFAULT_MAX_WIDTH, className)}
      {...rest}
    >
      {children}
    </Comp>
  )
}
