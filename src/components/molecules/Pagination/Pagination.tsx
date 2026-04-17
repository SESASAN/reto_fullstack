import { Button } from '@/components/atoms'

import { PAGINATION_ARIA_LABEL } from './Pagination.constants'
import type { PaginationProps } from './Pagination.types'

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const canPrev = currentPage > 1
  const canNext = currentPage < totalPages

  return (
    <nav aria-label={PAGINATION_ARIA_LABEL} className="mt-12 flex justify-center">
      <div className="flex flex-wrap items-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          disabled={!canPrev}
          onClick={() => onPageChange?.(currentPage - 1)}
        >
          Anterior
        </Button>

        <span className="px-3 text-sm text-on-surface/70">
          {currentPage} / {totalPages}
        </span>

        <Button
          variant="ghost"
          size="sm"
          disabled={!canNext}
          onClick={() => onPageChange?.(currentPage + 1)}
        >
          Siguiente
        </Button>
      </div>
    </nav>
  )
}
