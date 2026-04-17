import { Container } from '@/components/atoms'
import { InventoryHeader } from '@/components/molecules/InventoryHeader'

import {
  EMPTY_GRID_DESCRIPTION,
  EMPTY_GRID_TITLE,
} from './ProductGridSection.constants'
import type { ProductGridSectionProps } from './ProductGridSection.types'

export function ProductGridSection({ title, subtitle }: ProductGridSectionProps) {
  return (
    <section className="py-20">
      <Container>
        <InventoryHeader title={title} subtitle={subtitle} />

        <div className="mt-10 rounded-3xl border border-outline-variant/10 bg-surface-container-low p-10 text-center shadow-2xl">
          <h3 className="font-headline text-lg font-bold text-on-surface">
            {EMPTY_GRID_TITLE}
          </h3>
          <p className="mt-2 text-sm text-on-surface-variant">
            {EMPTY_GRID_DESCRIPTION}
          </p>
        </div>
      </Container>
    </section>
  )
}
