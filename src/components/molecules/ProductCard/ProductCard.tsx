import { Link } from 'react-router-dom'

import { Badge } from '@/components/atoms'
import { buildProductSlug } from '@/services/slugify'
import { formatPrice } from '@/styles/formatPrice'
import type { Product } from '@/types'

import {
  PRODUCT_ADD_TO_CART_LABEL,
  PRODUCT_NEW_LABEL,
} from './ProductCard.constants'
import type { ProductCardProps } from './ProductCard.types'

const categoryLabel = (product: Product) => product.category?.toUpperCase() ?? ''

export function ProductCard({ product, onAddToCart, viewMode = 'grid' }: ProductCardProps) {
  const productSlug = buildProductSlug(product.id, product.title)
  const isGrid = viewMode === 'grid'

  if (isGrid) {
    return (
      <div className="group relative flex flex-col rounded-2xl border border-outline-variant/10 bg-surface-container p-3 sm:p-5 transition-all duration-300 hover:-translate-y-2 hover:border-primary/20 hover:shadow-[0_20px_40px_rgba(0,0,0,0.35)]">
        {product.rating?.count && product.rating.count > 200 ? (
          <div className="absolute right-4 top-4 z-10">
            <Badge variant="primary">{PRODUCT_NEW_LABEL}</Badge>
          </div>
        ) : null}

        <Link to={`/products/${productSlug}`} className="flex flex-col flex-grow">
          <div className="aspect-square overflow-hidden rounded-xl bg-surface-container-low flex items-center justify-center">
            <img
              src={product.image}
              alt={product.title}
              className="h-full w-full object-contain p-6 transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
            />
</div>

          <div className="mt-5 flex flex-col flex-grow gap-3">
            <div className="flex-grow">
              <p className="text-[10px] font-black tracking-[0.2em] text-primary uppercase">
                {categoryLabel(product)}
              </p>
              <h3 className="mt-1 line-clamp-2 font-headline text-xs sm:text-lg font-bold text-on-surface">
                {product.title}
              </h3>
            </div>

            <div className="flex items-center justify-between gap-2">
              <span className="font-headline text-base sm:text-xl font-black tracking-tight">
                {formatPrice(product.price, 'USD')}
              </span>
              <button
className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-obsidian-primary text-on-primary font-bold shadow-lg shadow-primary/20 hover:shadow-primary/30 active:scale-95 sm:h-auto sm:w-auto sm:px-4 sm:py-2 sm:rounded-xl sm:text-sm"
                onClick={(e) => {
                  e.preventDefault()
                  onAddToCart?.(product.id)
                }}
              >
                <span className="hidden sm:inline">{PRODUCT_ADD_TO_CART_LABEL}</span>
<span className="sm:hidden text-base font-normal">+</span>
              </button>
            </div>
          </div>
        </Link>
      </div>
    )
  }

  // List view
  return (
    <div className="group relative flex gap-6 rounded-2xl border border-outline-variant/10 bg-surface-container p-5 transition-all duration-300 hover:border-primary/20">
      <Link to={`/products/${productSlug}`} className="shrink-0">
        <div className="h-28 w-28 overflow-hidden rounded-xl bg-surface-container-low flex items-center justify-center">
          <img
            src={product.image}
            alt={product.title}
            className="h-full w-full object-contain p-4"
            loading="lazy"
          />
        </div>
      </Link>

      <div className="flex flex-1 flex-col justify-between">
        <Link to={`/products/${productSlug}`}>
          <p className="text-[10px] font-black tracking-[0.2em] text-primary uppercase">
            {categoryLabel(product)}
          </p>
          <h3 className="mt-1 line-clamp-2 font-headline text-lg font-bold text-on-surface">
            {product.title}
          </h3>
          {product.rating?.rate && (
            <p className="mt-1 text-sm text-on-surface-variant">
              ★ {product.rating.rate} ({product.rating.count} reseñas)
            </p>
          )}
        </Link>

        <div className="flex items-center justify-between">
          <span className="font-headline text-xl font-black tracking-tight">
            {formatPrice(product.price, 'USD')}
          </span>
          <button
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-obsidian-primary text-on-primary font-bold shadow-lg shadow-primary/20 hover:shadow-primary/30 active:scale-95 sm:h-auto sm:w-auto sm:px-4 sm:py-2 sm:rounded-xl sm:text-sm"
            onClick={() => onAddToCart?.(product.id)}
          >
            <span className="hidden sm:inline">{PRODUCT_ADD_TO_CART_LABEL}</span>
            <span className="sm:hidden text-lg font-normal">+</span>
          </button>
        </div>
      </div>
    </div>
  )
}
