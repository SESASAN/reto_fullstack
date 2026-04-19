import { useEffect, useMemo } from 'react'

import { Link } from 'react-router-dom'

import { Badge, Container } from '@/components/atoms'
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
      <Container className="py-16">
        <h1 className="font-headline text-3xl sm:text-4xl font-extrabold tracking-tight">
          {FEATURED_TITLE}
        </h1>
        <p className="mt-2 text-on-surface-variant">Cargando productos...</p>
      </Container>
    )
  }

  if (error) {
    return (
      <Container className="py-16">
        <h1 className="font-headline text-3xl sm:text-4xl font-extrabold tracking-tight">
          {FEATURED_TITLE}
        </h1>
        <p className="mt-2 text-on-surface-variant">{error}</p>
      </Container>
    )
  }

  return (
    <Container className="py-8 sm:py-16">
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-sm text-on-surface-variant transition-colors hover:text-primary"
      >
        <span className="material-symbols-outlined text-[20px]">arrow_back</span>
        Volver al catálogo
      </Link>

      <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
        <div className="flex h-12 w-12 sm:h-16 sm:w-16 items-center justify-center rounded-xl sm:rounded-2xl bg-primary/20">
          <span className="material-symbols-outlined text-2xl sm:text-3xl text-primary">star</span>
        </div>
        <div>
          <h1 className="font-headline text-3xl sm:text-4xl font-extrabold tracking-tight">
            {FEATURED_TITLE}
          </h1>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {featuredProducts.map((product) => {
          const productSlug = buildProductSlug(product.id, product.title)
          return (
            <Link
              key={product.id}
              to={`/products/${productSlug}`}
              className="group relative overflow-hidden rounded-2xl border border-outline-variant/10 bg-surface-container p-4 sm:p-6 transition-all duration-500 hover:border-primary/40 hover:shadow-[0_20px_60px_rgba(142,127,255,0.2)]"
            >
              <div className="absolute right-3 top-3 sm:right-4 sm:top-4 z-10">
                <Badge variant="primary">Destacado</Badge>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
                <div className="h-24 w-24 sm:h-32 sm:w-32 shrink-0 overflow-hidden rounded-xl bg-surface-container-low flex items-center justify-center">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="h-full w-full object-contain p-2 sm:p-4 transition-transform duration-500 group-hover:scale-110"
                  />
                </div>

                <div className="flex-1 text-center sm:text-left w-full">
                  <p className="text-[10px] font-black tracking-[0.2em] text-primary uppercase">
                    {product.category}
                  </p>
                  <h3 className="mt-1 sm:mt-2 line-clamp-2 font-headline text-base sm:text-xl font-bold text-on-surface">
                    {product.title}
                  </h3>
                  {product.rating?.rate && (
                    <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-on-surface-variant">
                      ★ {product.rating.rate} ({product.rating.count})
                    </p>
                  )}
                  <p className="mt-2 sm:mt-4 font-headline text-lg sm:text-2xl font-black text-on-surface">
                    {formatPrice(product.price, 'USD')}
                  </p>
                </div>
              </div>

              <div className="mt-4 sm:mt-6 flex gap-2 sm:gap-3">
                <button
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-obsidian-primary text-on-primary font-bold shadow-lg shadow-primary/20 hover:shadow-primary/30 active:scale-95 sm:h-auto sm:w-auto sm:flex-1 sm:px-4 sm:py-2 sm:rounded-xl sm:text-sm"
                  onClick={(e) => {
                    e.preventDefault()
                    addItem(product)
                  }}
                >
                  <span className="hidden sm:inline">Agregar al carrito</span>
                  <span className="sm:hidden text-base font-normal">+</span>
                </button>
              </div>
            </Link>
          )
        })}
      </div>

      <div className="mt-12 sm:mt-16 text-center">
        <button
          className="px-6 py-3 rounded-xl border border-primary/20 text-primary font-bold hover:bg-primary/10 transition-colors sm:px-8 sm:py-4 sm:text-base"
          onClick={() => window.location.href = '/'}
        >
          Ver todos los productos
        </button>
      </div>
    </Container>
  )
}