import { Input } from '@/components/atoms'

import { SEARCH_PLACEHOLDER } from './SearchBar.constants'
import type { SearchBarProps } from './SearchBar.types'

export function SearchBar({
  value,
  onChange,
  placeholder = SEARCH_PLACEHOLDER,
  ariaLabel,
}: SearchBarProps) {
  return (
    <div className="relative w-full">
      <span className="material-symbols-outlined pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-outline">
        search
      </span>
      <Input
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        className="pl-10"
        aria-label={ariaLabel ?? placeholder}
      />
    </div>
  )
}
