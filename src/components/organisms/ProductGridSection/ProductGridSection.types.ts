import type { Product } from '@/types'
import type { ViewMode } from '@/store/ui.store'

export type ProductGridSectionProps = {
  title?: string
  subtitle?: string
  products?: Product[]
  currentPage?: number
  totalPages?: number
  viewMode?: ViewMode
  onViewModeChange?: (mode: ViewMode) => void
  selectedCategory?: string | null
  onCategoryChange?: (category: string | null) => void
  showCategoryFilter?: boolean
  onAddToCart?: (productId: number) => void
  onPageChange?: (page: number) => void
  isLoading?: boolean
  error?: string | null
  onRetry?: () => void
  emptyTitle?: string
  emptyDescription?: string
}
