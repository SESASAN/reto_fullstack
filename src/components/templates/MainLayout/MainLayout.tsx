import { NavLink, Outlet } from 'react-router-dom'

import { Container, IconButton } from '@/components/atoms'

import { BRAND_NAME, NAV_ITEMS } from './MainLayout.constants'
import type { NavItem } from './MainLayout.types'

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  [
    'text-sm transition-colors',
    isActive ? 'text-primary font-bold' : 'text-on-surface/70 hover:text-primary',
  ].join(' ')

const renderNavItem = (item: NavItem) => (
  <NavLink key={item.to} to={item.to} className={navLinkClass} end={item.to === '/'}>
    {item.label}
  </NavLink>
)

export function MainLayout() {
  return (
    <div className="min-h-screen bg-background text-on-surface">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-outline-variant/10 bg-background/80 backdrop-blur-xl shadow-obsidian-nav">
        <Container className="flex items-center justify-between py-4">
          <NavLink to="/" className="font-headline text-xl font-black tracking-tight">
            {BRAND_NAME}
          </NavLink>

          <nav className="hidden items-center gap-8 md:flex">
            {NAV_ITEMS.map(renderNavItem)}
          </nav>

          <div className="flex items-center gap-3">
            <NavLink to="/cart">
              <IconButton
                ariaLabel="Ir al carrito"
                icon={
                  <span className="material-symbols-outlined text-[20px]">
                    shopping_cart
                  </span>
                }
              />
            </NavLink>
          </div>
        </Container>
      </header>

      <main className="pt-20">
        <Outlet />
      </main>

      <footer className="border-t border-outline-variant/10 bg-surface-container-lowest px-6 py-10 md:px-8">
        <Container className="text-xs text-on-surface/50">
          © {new Date().getFullYear()} {BRAND_NAME}. Todos los derechos reservados.
        </Container>
      </footer>
    </div>
  )
}
