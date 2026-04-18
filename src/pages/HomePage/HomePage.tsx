import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { NewsletterCallout } from '@/components/organisms/NewsletterCallout'
import { HeroSection } from '@/components/organisms/HeroSection'
import { ProductGridSection } from '@/components/organisms/ProductGridSection'
import {
  GRID_EMPTY_SEARCH_DESCRIPTION,
  GRID_EMPTY_SEARCH_TITLE,
} from '@/components/organisms/ProductGrid/ProductGrid.constants'
import { filterProducts } from '@/services/filterProducts'
import { useCartStore } from '@/store/cart.store'
import { useProductsStore } from '@/store/products.store'
import { useUiStore } from '@/store/ui.store'

export function HomePage() {
  const navigate = useNavigate()
  const products = useProductsStore((s) => s.products)
  const isLoading = useProductsStore((s) => s.isLoading)
  const error = useProductsStore((s) => s.error)
  const fetchProducts = useProductsStore((s) => s.fetchProducts)
  const searchQuery = useUiStore((s) => s.searchQuery)
  const currentPage = useUiStore((s) => s.currentPage)
  const itemsPerPage = useUiStore((s) => s.itemsPerPage)
  const viewMode = useUiStore((s) => s.viewMode)
  const selectedCategory = useUiStore((s) => s.selectedCategory)
  const setViewMode = useUiStore((s) => s.setViewMode)
  const setSelectedCategory = useUiStore((s) => s.setSelectedCategory)
  const setCurrentPage = useUiStore((s) => s.setCurrentPage)
  const addItem = useCartStore((s) => s.addItem)

  const filteredProducts = filterProducts(products, searchQuery, selectedCategory)
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
      <HeroSection onPrimaryClick={() => window.scrollTo({ top: 400, behavior: 'smooth' })} onSecondaryClick={() => navigate('/featured')} />
      <ProductGridSection
        products={paginatedProducts}
        currentPage={safeCurrentPage}
        totalPages={totalPages}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        onPageChange={setCurrentPage}
        onAddToCart={(productId) => {
          const product = products.find((p) => p.id === productId)
          if (product) addItem(product)
        }}
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
