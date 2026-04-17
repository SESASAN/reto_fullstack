import { INVENTORY_SUBTITLE, INVENTORY_TITLE } from './InventoryHeader.constants'
import type { InventoryHeaderProps } from './InventoryHeader.types'

export function InventoryHeader({
  title = INVENTORY_TITLE,
  subtitle = INVENTORY_SUBTITLE,
  viewMode = 'grid',
  onViewModeChange,
}: InventoryHeaderProps) {
  return (
    <div className="flex items-end justify-between gap-6">
      <div>
        <h2 className="font-headline text-2xl font-bold tracking-tight md:text-3xl">
          {title}
        </h2>
        <p className="mt-2 text-xs font-semibold tracking-[0.2em] text-on-surface-variant/60 uppercase">
          {subtitle}
        </p>
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          className={[
            'rounded-lg border border-outline-variant/20 p-2 transition-colors',
            viewMode === 'grid'
              ? 'text-primary bg-primary/10'
              : 'text-outline hover:text-primary',
          ].join(' ')}
          aria-label="Vista de grilla"
          aria-pressed={viewMode === 'grid'}
          onClick={() => onViewModeChange?.('grid')}
        >
          <span className="material-symbols-outlined text-[18px]">grid_view</span>
        </button>
        <button
          type="button"
          className={[
            'rounded-lg border border-outline-variant/20 p-2 transition-colors',
            viewMode === 'list'
              ? 'text-primary bg-primary/10'
              : 'text-outline hover:text-primary',
          ].join(' ')}
          aria-label="Vista de lista"
          aria-pressed={viewMode === 'list'}
          onClick={() => onViewModeChange?.('list')}
        >
          <span className="material-symbols-outlined text-[18px]">view_list</span>
        </button>
      </div>
    </div>
  )
}
