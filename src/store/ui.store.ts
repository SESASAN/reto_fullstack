import { create } from 'zustand'

export type ViewMode = 'grid' | 'list'

export type UiState = {
  searchQuery: string
  currentPage: number
  itemsPerPage: number
  viewMode: ViewMode
  selectedCategory: string | null

  setSearchQuery: (query: string) => void
  setCurrentPage: (page: number) => void
  setItemsPerPage: (items: number) => void
  setViewMode: (mode: ViewMode) => void
  setSelectedCategory: (category: string | null) => void
  resetPage: () => void
}

const clampInt = (value: number, min: number, max: number) =>
  Math.max(min, Math.min(max, Math.trunc(value)))

export const useUiStore = create<UiState>((set) => ({
  searchQuery: '',
  currentPage: 1,
  itemsPerPage: 8,
  viewMode: 'grid',
  selectedCategory: null,

  setSearchQuery: (query) =>
    set(() => ({
      searchQuery: query,
      currentPage: 1,
    })),

  setCurrentPage: (page) =>
    set((state) => ({
      ...state,
      currentPage: clampInt(page, 1, Number.MAX_SAFE_INTEGER),
    })),

  setItemsPerPage: (items) =>
    set((state) => ({
      ...state,
      itemsPerPage: clampInt(items, 1, 48),
      currentPage: 1,
    })),

  setViewMode: (mode) => set(() => ({ viewMode: mode })),

  setSelectedCategory: (category) =>
    set(() => ({
      selectedCategory: category,
      currentPage: 1,
    })),

  resetPage: () => set((state) => ({ ...state, currentPage: 1 })),
}))
