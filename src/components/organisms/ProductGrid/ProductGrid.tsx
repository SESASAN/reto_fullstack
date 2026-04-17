import type { ProductGridProps } from './ProductGrid.types'
import { GRID_EMPTY_TITLE } from './ProductGrid.constants'

import { ProductCard } from '@/components/molecules/ProductCard'

export function ProductGrid({ products, onAddToCart }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="mt-10 rounded-3xl border border-outline-variant/10 bg-surface-container-low p-10 text-center shadow-2xl">
        <p className="text-sm text-on-surface-variant">{GRID_EMPTY_TITLE}</p>
      </div>
    )
  }

  return (
    <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} onAddToCart={onAddToCart} />
      ))}
    </div>
  )
}
