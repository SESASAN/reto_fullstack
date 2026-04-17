import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'

import { Button, IconButton } from '@/components/atoms'
import { parseProductIdFromSlug } from '@/services/slugify'
import { formatPrice } from '@/styles/formatPrice'
import { useCartStore } from '@/store/cart.store'
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
  const addItem = useCartStore((s) => s.addItem)

  useEffect(() => {
    if (!productId) return

    void fetchProductById(productId)

    return () => {
      clearSelectedProduct()
    }
  }, [clearSelectedProduct, fetchProductById, productId])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  return (
    <div className="mx-auto max-w-[1440px] px-6 py-16 md:px-8">
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-sm text-on-surface-variant transition-colors hover:text-primary"
      >
        <span className="material-symbols-outlined text-[20px]">arrow_back</span>
        Volver al catálogo
      </Link>

      <h1 className="mt-6 font-headline text-3xl font-extrabold tracking-tight">
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

            {product.rating?.rate && (
              <p className="mt-2 text-sm text-on-surface-variant">
                ★ {product.rating.rate} ({product.rating.count} reseñas)
              </p>
            )}

            <p className="mt-4 text-2xl font-black text-on-surface">
              {formatPrice(product.price, 'USD')}
            </p>
            <p className="mt-6 max-w-2xl text-on-surface-variant">
              {product.description}
            </p>

            <div className="mt-8">
              <Button
                size="lg"
                onClick={() => addItem(product)}
              >
                Agregar al carrito
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-8 flex flex-col items-center justify-center rounded-3xl border border-outline-variant/10 bg-surface-container-low p-16 text-center shadow-2xl">
          <span className="material-symbols-outlined text-[64px] text-on-surface-variant/40">
            search_off
          </span>
          <h2 className="mt-4 font-headline text-xl font-bold text-on-surface">
            Producto no encontrado
          </h2>
          <p className="mt-2 text-on-surface-variant">
            Este producto no existe o fue eliminado.
          </p>
          <Link
            to="/"
            className="mt-6 text-primary hover:underline"
          >
            Volver al catálogo
          </Link>
        </div>
      )}
    </div>
  )
}
