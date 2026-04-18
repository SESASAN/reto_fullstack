import { useEffect, useMemo } from 'react'

import { Link } from 'react-router-dom'

import { Badge, Button } from '@/components/atoms'
import { buildProductSlug } from '@/services/slugify'
import { formatPrice } from '@/styles/formatPrice'
import { useCartStore } from '@/store/cart.store'
import { useProductsStore } from '@/store/products.store'

import { FEATURED_TITLE } from './FeaturedPage.constants'

export function FeaturedPage() {
  const products = useProductsStore((s) => s.products)
  const isLoading = useProductsStore((s) => s.isLoading)
  const error = useProductsStore((s) => s.error)
  const fetchProducts = useProductsStore((s) => s.fetchProducts)
  const addItem = useCartStore((s) => s.addItem)

  // Select 5 random products
  const featuredProducts = useMemo(() => {
    if (products.length === 0) return []
    const shuffled = [...products].sort(() => Math.random() - 0.5)
    return shuffled.slice(0, 5)
  }, [products])

  useEffect(() => {
    if (products.length === 0) {
      void fetchProducts()
    }
  }, [])

  if (isLoading) {
    return (
      <div className="mx-auto max-w-[1440px] px-6 py-16 md:px-8">
        <h1 className="font-headline text-4xl font-extrabold tracking-tight">
          {FEATURED_TITLE}
        </h1>
        <p className="mt-2 text-on-surface-variant">Cargando productos...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="mx-auto max-w-[1440px] px-6 py-16 md:px-8">
        <h1 className="font-headline text-4xl font-extrabold tracking-tight">
          {FEATURED_TITLE}
        </h1>
        <p className="mt-2 text-on-surface-variant">{error}</p>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-[1440px] px-6 py-16 md:px-8">
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-sm text-on-surface-variant transition-colors hover:text-primary"
      >
        <span className="material-symbols-outlined text-[20px]">arrow_back</span>
        Volver al catálogo
      </Link>

      <div className="mt-8 flex items-center gap-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/20">
          <span className="material-symbols-outlined text-3xl text-primary">star</span>
        </div>
        <div>
          <h1 className="font-headline text-4xl font-extrabold tracking-tight">
            {FEATURED_TITLE}
          </h1>
        </div>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {featuredProducts.map((product) => {
          const productSlug = buildProductSlug(product.id, product.title)
          return (
            <Link
              key={product.id}
              to={`/products/${productSlug}`}
              className="group relative overflow-hidden rounded-3xl border border-outline-variant/10 bg-surface-container p-6 transition-all duration-500 hover:border-primary/40 hover:shadow-[0_20px_60px_rgba(142,127,255,0.2)]"
            >
              <div className="absolute right-4 top-4 z-10">
                <Badge variant="primary">Destacado</Badge>
              </div>

              <div className="flex items-center gap-6">
                <div className="h-32 w-32 shrink-0 overflow-hidden rounded-xl bg-surface-container-low flex items-center justify-center">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="h-full w-full object-contain p-4 transition-transform duration-500 group-hover:scale-110"
                  />
                </div>

                <div className="flex-1">
                  <p className="text-[10px] font-black tracking-[0.2em] text-primary uppercase">
                    {product.category}
                  </p>
                  <h3 className="mt-2 line-clamp-2 font-headline text-xl font-bold text-on-surface">
                    {product.title}
                  </h3>
                  {product.rating?.rate && (
                    <p className="mt-2 text-sm text-on-surface-variant">
                      ★ {product.rating.rate} ({product.rating.count})
                    </p>
                  )}
                  <p className="mt-4 font-headline text-2xl font-black text-on-surface">
                    {formatPrice(product.price, 'USD')}
                  </p>
                </div>
              </div>

              <div className="mt-6 flex gap-3">
                <Button
                  size="sm"
                  className="flex-1"
                  onClick={(e) => {
                    e.preventDefault()
                    addItem(product)
                  }}
                >
                  Agregar al carrito
                </Button>
              </div>
            </Link>
          )
        })}
      </div>

      <div className="mt-16 text-center">
        <Link to="/" className="text-primary hover:underline">
          <Button variant="secondary" size="lg">
            Ver todos los productos
          </Button>
        </Link>
      </div>
    </div>
  )
}