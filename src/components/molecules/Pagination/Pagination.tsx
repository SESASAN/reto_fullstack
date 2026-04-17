import { Button } from '@/components/atoms'

import { PAGINATION_ARIA_LABEL } from './Pagination.constants'
import type { PaginationProps } from './Pagination.types'

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) return null

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

        <div className="flex items-center gap-2">
          {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => {
            const isActive = page === currentPage

            return (
              <button
                key={page}
                type="button"
                onClick={() => onPageChange?.(page)}
                className={[
                  'min-w-9 rounded-lg px-3 py-2 text-sm font-semibold transition-colors',
                  isActive
                    ? 'bg-surface-container-high text-on-surface shadow-sm'
                    : 'text-on-surface/60 hover:text-primary',
                ].join(' ')}
                aria-current={isActive ? 'page' : undefined}
              >
                {page}
              </button>
            )
          })}
        </div>

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
