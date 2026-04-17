import type { Product } from '@/types'

export type ProductCardProps = {
  product: Product
  onAddToCart?: (productId: number) => void
}
