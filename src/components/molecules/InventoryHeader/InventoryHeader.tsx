import { INVENTORY_SUBTITLE, INVENTORY_TITLE } from './InventoryHeader.constants'
import type { InventoryHeaderProps } from './InventoryHeader.types'

export function InventoryHeader({
  title = INVENTORY_TITLE,
  subtitle = INVENTORY_SUBTITLE,
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
          className="rounded-lg border border-outline-variant/20 p-2 text-outline transition-colors hover:text-primary"
          aria-label="Cambiar vista"
        >
          <span className="material-symbols-outlined text-[18px]">grid_view</span>
        </button>
        <button
          type="button"
          className="rounded-lg border border-outline-variant/20 p-2 text-outline transition-colors hover:text-primary"
          aria-label="Filtrar"
        >
          <span className="material-symbols-outlined text-[18px]">filter_list</span>
        </button>
      </div>
    </div>
  )
}
