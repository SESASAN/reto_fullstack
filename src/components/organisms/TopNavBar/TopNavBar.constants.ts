export const BRAND_NAME = 'OBSIDIAN'

// Links para usuarios SIN sesión
export const NAV_LINKS_PUBLIC = [
  { to: '/', label: 'Tienda', end: true },
  { to: '/featured', label: 'Destacados' },
  { to: '/cart', label: 'Carrito' },
  { to: '/login', label: 'Ingresar' },
] as const

// Links para usuarios CON sesión
export const NAV_LINKS_PRIVATE = [
  { to: '/', label: 'Tienda', end: true },
  { to: '/featured', label: 'Destacados' },
  { to: '/orders', label: 'Órdenes' },
  { to: '/cart', label: 'Carrito' },
] as const
