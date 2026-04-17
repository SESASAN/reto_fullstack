import { Container } from '@/components/atoms'
import { InventoryHeader } from '@/components/molecules/InventoryHeader'
import { Pagination } from '@/components/molecules/Pagination'
import { ProductGrid } from '@/components/organisms/ProductGrid'

import type { ProductGridSectionProps } from './ProductGridSection.types'

export function ProductGridSection({
  title,
  subtitle,
  currentPage = 1,
  totalPages = 3,
  products = [],
  onAddToCart,
}: ProductGridSectionProps) {
  return (
    <section className="py-20">
      <Container>
        <InventoryHeader title={title} subtitle={subtitle} />

        <ProductGrid products={products} onAddToCart={onAddToCart} />

        <Pagination currentPage={currentPage} totalPages={totalPages} />
      </Container>
    </section>
  )
}
