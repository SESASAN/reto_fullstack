import { useEffect } from 'react'

import { NewsletterCallout } from '@/components/organisms/NewsletterCallout'
import { HeroSection } from '@/components/organisms/HeroSection'
import { ProductGridSection } from '@/components/organisms/ProductGridSection'
import { filterProducts } from '@/services/filterProducts'
import { useProductsStore } from '@/store/products.store'
import { useUiStore } from '@/store/ui.store'

export function HomePage() {
  const products = useProductsStore((s) => s.products)
  const isLoading = useProductsStore((s) => s.isLoading)
  const error = useProductsStore((s) => s.error)
  const fetchProducts = useProductsStore((s) => s.fetchProducts)
  const searchQuery = useUiStore((s) => s.searchQuery)

  const filteredProducts = filterProducts(products, searchQuery)

  useEffect(() => {
    void fetchProducts()
  }, [fetchProducts])

  return (
    <div>
      <HeroSection />
      <ProductGridSection
        products={filteredProducts}
        isLoading={isLoading}
        error={error}
        onRetry={() => void fetchProducts()}
      />
      <NewsletterCallout />
    </div>
  )
}
