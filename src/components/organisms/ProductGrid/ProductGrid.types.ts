import type { Product } from '@/types'
import type { ViewMode } from '@/store/ui.store'

export type ProductGridProps = {
  products: Product[]
  onAddToCart?: (productId: number) => void
  viewMode?: ViewMode
  emptyTitle?: string
  emptyDescription?: string
}
