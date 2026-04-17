import type { Product } from '@/types'

const normalize = (value: string) => value.trim().toLowerCase()

export function filterProducts(products: Product[], query: string) {
  const normalizedQuery = normalize(query)

  if (!normalizedQuery) return products

  return products.filter((product) => {
    const title = normalize(product.title)
    const category = normalize(product.category)

    return (
      title.includes(normalizedQuery) || category.includes(normalizedQuery)
    )
  })
}
