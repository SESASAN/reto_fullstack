import type { Product } from '@/types'

const normalize = (value: string) => value.trim().toLowerCase()

export function filterProducts(
  products: Product[],
  query: string,
  category: string | null = null
) {
  const normalizedQuery = normalize(query)
  const normalizedCategory = category ? normalize(category) : null

  let filtered = products

  // Filter by category first
  if (normalizedCategory) {
    filtered = filtered.filter(
      (product) => normalize(product.category) === normalizedCategory
    )
  }

  // Then filter by search query
  if (normalizedQuery) {
    filtered = filtered.filter((product) => {
      const title = normalize(product.title)
      const category = normalize(product.category)

      return (
        title.includes(normalizedQuery) || category.includes(normalizedQuery)
      )
    })
  }

  return filtered
}
