import { useEffect } from 'react'

import { NewsletterCallout } from '@/components/organisms/NewsletterCallout'
import { HeroSection } from '@/components/organisms/HeroSection'
import { ProductGridSection } from '@/components/organisms/ProductGridSection'
import {
  GRID_EMPTY_SEARCH_DESCRIPTION,
  GRID_EMPTY_SEARCH_TITLE,
} from '@/components/organisms/ProductGrid/ProductGrid.constants'
import { filterProducts } from '@/services/filterProducts'
import { useProductsStore } from '@/store/products.store'
import { useUiStore } from '@/store/ui.store'

export function HomePage() {
  const products = useProductsStore((s) => s.products)
  const isLoading = useProductsStore((s) => s.isLoading)
  const error = useProductsStore((s) => s.error)
  const fetchProducts = useProductsStore((s) => s.fetchProducts)
  const searchQuery = useUiStore((s) => s.searchQuery)
  const currentPage = useUiStore((s) => s.currentPage)
  const itemsPerPage = useUiStore((s) => s.itemsPerPage)
  const setCurrentPage = useUiStore((s) => s.setCurrentPage)

  const filteredProducts = filterProducts(products, searchQuery)
  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / itemsPerPage))
  const safeCurrentPage = Math.min(currentPage, totalPages)
  const start = (safeCurrentPage - 1) * itemsPerPage
  const paginatedProducts = filteredProducts.slice(start, start + itemsPerPage)

  useEffect(() => {
    void fetchProducts()
  }, [fetchProducts])

  useEffect(() => {
    if (currentPage !== safeCurrentPage) {
      setCurrentPage(safeCurrentPage)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [currentPage, safeCurrentPage, setCurrentPage])

  return (
    <div>
      <HeroSection />
      <ProductGridSection
        products={paginatedProducts}
        currentPage={safeCurrentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        isLoading={isLoading}
        error={error}
        onRetry={() => void fetchProducts()}
        emptyTitle={searchQuery ? GRID_EMPTY_SEARCH_TITLE : undefined}
        emptyDescription={searchQuery ? GRID_EMPTY_SEARCH_DESCRIPTION : undefined}
      />
      <NewsletterCallout />
    </div>
  )
}
