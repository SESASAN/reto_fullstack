import type { Product } from '@/types'
import type { ViewMode } from '@/store/ui.store'

export type ProductCardProps = {
  product: Product
  onAddToCart?: (productId: number) => void
  viewMode?: ViewMode
}
