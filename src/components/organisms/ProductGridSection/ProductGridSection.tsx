import { Container, Skeleton } from '@/components/atoms'
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
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-10">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="flex flex-col rounded-2xl border border-outline-variant/10 bg-surface-container p-3 sm:p-5">
                <Skeleton className="aspect-square rounded-xl" />
                <div className="mt-5 flex flex-col gap-3">
                  <Skeleton className="h-3 w-16 rounded" />
                  <Skeleton className="h-5 w-3/4 rounded" />
                  <Skeleton className="h-6 w-24 rounded" />
                </div>
              </div>
            ))}
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

        {isLoading ? (
          <div className="mt-10 flex justify-center gap-2">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-10 w-10 rounded-lg" />
            ))}
          </div>
        ) : (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
          />
        )}
      </Container>
    </section>
  )
}
