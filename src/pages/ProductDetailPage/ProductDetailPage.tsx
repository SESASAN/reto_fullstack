import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { parseProductIdFromSlug } from '@/services/slugify'
import { formatPrice } from '@/styles/formatPrice'
import { useProductsStore } from '@/store/products.store'

import { PRODUCT_DETAIL_TITLE } from './ProductDetailPage.constants'
import type { ProductRouteParams } from './ProductDetailPage.types'

export function ProductDetailPage() {
  const { slug } = useParams<ProductRouteParams>()
  const productId = slug ? parseProductIdFromSlug(slug) : null
  const product = useProductsStore((s) => s.selectedProduct)
  const isLoading = useProductsStore((s) => s.isLoading)
  const error = useProductsStore((s) => s.error)
  const fetchProductById = useProductsStore((s) => s.fetchProductById)
  const clearSelectedProduct = useProductsStore((s) => s.clearSelectedProduct)

  useEffect(() => {
    if (!productId) return

    void fetchProductById(productId)

    return () => {
      clearSelectedProduct()
    }
  }, [clearSelectedProduct, fetchProductById, productId])

  return (
    <div className="mx-auto max-w-[1440px] px-6 py-16 md:px-8">
      <h1 className="font-headline text-3xl font-extrabold tracking-tight">
        {PRODUCT_DETAIL_TITLE}
      </h1>

      {!productId ? (
        <p className="mt-2 text-on-surface-variant">Producto no válido.</p>
      ) : isLoading ? (
        <p className="mt-2 text-on-surface-variant">Cargando producto...</p>
      ) : error ? (
        <p className="mt-2 text-on-surface-variant">{error}</p>
      ) : product ? (
        <div className="mt-8 grid gap-8 rounded-3xl border border-outline-variant/10 bg-surface-container-low p-8 shadow-2xl lg:grid-cols-[320px_1fr]">
          <div className="flex aspect-square items-center justify-center overflow-hidden rounded-2xl bg-surface-container p-6">
            <img
              src={product.image}
              alt={product.title}
              className="h-full w-full object-contain"
            />
          </div>

          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">
              {product.category}
            </p>
            <h2 className="mt-2 font-headline text-3xl font-black tracking-tight text-on-surface">
              {product.title}
            </h2>
            <p className="mt-4 text-2xl font-black text-on-surface">
              {formatPrice(product.price, 'USD')}
            </p>
            <p className="mt-6 max-w-2xl text-on-surface-variant">
              {product.description}
            </p>
          </div>
        </div>
      ) : (
        <p className="mt-2 text-on-surface-variant">No se encontró el producto.</p>
      )}
    </div>
  )
}
