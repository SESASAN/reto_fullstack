import type { ProductGridProps } from './ProductGrid.types'
import {
  GRID_EMPTY_DESCRIPTION,
  GRID_EMPTY_TITLE,
} from './ProductGrid.constants'

import { ProductCard } from '@/components/molecules/ProductCard'

export function ProductGrid({
  products,
  onAddToCart,
  viewMode = 'grid',
  emptyTitle = GRID_EMPTY_TITLE,
  emptyDescription = GRID_EMPTY_DESCRIPTION,
}: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="mt-10 rounded-3xl border border-outline-variant/10 bg-surface-container-low p-10 text-center shadow-2xl">
        <h3 className="font-headline text-lg font-bold text-on-surface">
          {emptyTitle}
        </h3>
        <p className="mt-2 text-sm text-on-surface-variant">{emptyDescription}</p>
      </div>
    )
  }

  const isGrid = viewMode === 'grid'

  return (
    <div
      className={isGrid
        ? 'mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4'
        : 'mt-10 flex flex-col gap-4'
      }
    >
      {products.map((p) => (
        <ProductCard key={p.id} product={p} onAddToCart={onAddToCart} viewMode={viewMode} />
      ))}
    </div>
  )
}
