import type { SearchBarProps } from './SearchBar.types'

export const DEFAULT_SEARCHBAR_PROPS: Pick<SearchBarProps, 'placeholder' | 'ariaLabel'> = {
  placeholder: 'Buscar productos',
  ariaLabel: 'Buscar productos',
}
