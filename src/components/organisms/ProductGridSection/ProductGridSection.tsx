import { Container } from '@/components/atoms'
import { InventoryHeader } from '@/components/molecules/InventoryHeader'
import { Pagination } from '@/components/molecules/Pagination'
import { ProductGrid } from '@/components/organisms/ProductGrid'
import { Button } from '@/components/atoms'

import type { ProductGridSectionProps } from './ProductGridSection.types'

export function ProductGridSection({
  title,
  subtitle,
  currentPage = 1,
  totalPages = 3,
  products = [],
  onAddToCart,
  isLoading = false,
  error = null,
  onRetry,
  onPageChange,
}: ProductGridSectionProps) {
  return (
    <section className="py-20">
      <Container>
        <InventoryHeader title={title} subtitle={subtitle} />

        {isLoading ? (
          <div className="mt-10 rounded-3xl border border-outline-variant/10 bg-surface-container-low p-10 text-center shadow-2xl">
            <p className="text-sm text-on-surface-variant">Cargando productos...</p>
          </div>
        ) : error ? (
          <div className="mt-10 rounded-3xl border border-outline-variant/10 bg-surface-container-low p-10 text-center shadow-2xl">
            <p className="text-sm text-on-surface-variant">{error}</p>
            {onRetry ? (
              <div className="mt-4 flex justify-center">
                <Button variant="secondary" onClick={onRetry}>
                  Reintentar
                </Button>
              </div>
            ) : null}
          </div>
        ) : (
          <ProductGrid products={products} onAddToCart={onAddToCart} />
        )}

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      </Container>
    </section>
  )
}
