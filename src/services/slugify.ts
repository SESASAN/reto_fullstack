export function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '')
}

export function buildProductSlug(productId: number, title: string) {
  const slug = slugify(title)
  return `${productId}-${slug}`
}

export function parseProductIdFromSlug(slug: string) {
  const match = slug.match(/^(\d+)(?:-|$)/)
  return match ? Number(match[1]) : null
}
