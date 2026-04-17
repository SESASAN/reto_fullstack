import type { Product } from '@/types'

export type ProductGridProps = {
  products: Product[]
  onAddToCart?: (productId: number) => void
}
