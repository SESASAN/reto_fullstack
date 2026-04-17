import { useEffect, useState } from 'react'

import { getCategories } from '@/services/products.api'

type CategoryFilterProps = {
  selectedCategory: string | null
  onCategoryChange: (category: string | null) => void
}

export function CategoryFilter({
  selectedCategory,
  onCategoryChange,
}: CategoryFilterProps) {
  const [categories, setCategories] = useState<string[]>([])

  useEffect(() => {
    void getCategories().then(setCategories).catch(console.error)
  }, [])

  return (
    <div className="mt-6">
      <select
        value={selectedCategory ?? ''}
        onChange={(e) => onCategoryChange(e.target.value || null)}
        className="rounded-lg border border-outline-variant/20 bg-surface-container px-4 py-2 text-sm text-on-surface transition-colors hover:border-primary/40 focus:border-primary focus:outline-none"
      >
        <option value="">Todas las categorías</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </option>
        ))}
      </select>
    </div>
  )
}