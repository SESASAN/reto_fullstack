import { Container } from '@/components/atoms'
import { CategoryFilter } from '@/components/molecules/CategoryFilter'
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
  viewMode,
  onViewModeChange,
  selectedCategory,
  onCategoryChange,
  showCategoryFilter = true,
  onAddToCart,
  isLoading = false,
  error = null,
  onRetry,
  onPageChange,
  emptyTitle,
  emptyDescription,
}: ProductGridSectionProps) {
  return (
    <section className="py-20">
      <Container>
        <InventoryHeader
          title={title}
          subtitle={subtitle}
          viewMode={viewMode}
          onViewModeChange={onViewModeChange}
        />

        {showCategoryFilter && onCategoryChange ? (
          <CategoryFilter
            selectedCategory={selectedCategory ?? null}
            onCategoryChange={onCategoryChange}
          />
        ) : null}

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
          <ProductGrid
            products={products}
            viewMode={viewMode}
            onAddToCart={onAddToCart}
            emptyTitle={emptyTitle}
            emptyDescription={emptyDescription}
          />
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
