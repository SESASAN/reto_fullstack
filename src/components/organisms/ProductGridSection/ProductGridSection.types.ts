import type { Product } from '@/types'

export type ProductGridSectionProps = {
  title?: string
  subtitle?: string
  currentPage?: number
  totalPages?: number
  products?: Product[]
  onAddToCart?: (productId: number) => void
  isLoading?: boolean
  error?: string | null
  onRetry?: () => void
  onPageChange?: (page: number) => void
}
