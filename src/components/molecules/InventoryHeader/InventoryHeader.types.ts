import type { ViewMode } from '@/store/ui.store'

export type InventoryHeaderProps = {
  title?: string
  subtitle?: string
  viewMode?: ViewMode
  onViewModeChange?: (mode: ViewMode) => void
}
