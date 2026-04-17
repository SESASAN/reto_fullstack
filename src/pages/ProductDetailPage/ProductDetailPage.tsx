import { useParams } from 'react-router-dom'

import { parseProductIdFromSlug } from '@/services/slugify'

import { PRODUCT_DETAIL_TITLE } from './ProductDetailPage.constants'
import type { ProductRouteParams } from './ProductDetailPage.types'

export function ProductDetailPage() {
  const { slug } = useParams<ProductRouteParams>()
  const productId = slug ? parseProductIdFromSlug(slug) : null

  return (
    <div className="mx-auto max-w-[1440px] px-6 py-16 md:px-8">
      <h1 className="font-headline text-3xl font-extrabold tracking-tight">
        {PRODUCT_DETAIL_TITLE}
      </h1>
      <p className="mt-2 text-on-surface-variant">
        Producto #{productId ?? '—'}
      </p>
    </div>
  )
}
