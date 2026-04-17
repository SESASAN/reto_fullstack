import { NavLink } from 'react-router-dom'

import { Container, IconButton } from '@/components/atoms'
import { SearchBar } from '@/components/molecules/SearchBar'
import { useCartStore } from '@/store/cart.store'
import { useUiStore } from '@/store/ui.store'

import { BRAND_NAME, NAV_LINKS } from './TopNavBar.constants'
import type { TopNavBarLink } from './TopNavBar.types'

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  [
    'text-sm transition-colors',
    isActive
      ? 'text-primary font-bold'
      : 'text-on-surface/70 hover:text-primary',
  ].join(' ')

const renderLink = (link: TopNavBarLink) => (
  <NavLink
    key={link.to}
    to={link.to}
    className={navLinkClass}
    end={link.end}
  >
    {link.label}
  </NavLink>
)

export function TopNavBar() {
  const totalItems = useCartStore((s) => s.totalItems())
  const searchQuery = useUiStore((s) => s.searchQuery)
  const setSearchQuery = useUiStore((s) => s.setSearchQuery)

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-outline-variant/10 bg-background/80 backdrop-blur-xl shadow-obsidian-nav">
      <Container className="flex items-center justify-between py-4">
        <NavLink
          to="/"
          className="font-headline text-xl font-black tracking-tight"
        >
          {BRAND_NAME}
        </NavLink>

        <div className="mx-10 hidden w-full max-w-md md:block">
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
        </div>

        <nav className="hidden items-center gap-8 md:flex">
              {NAV_LINKS.map(renderLink)}
        </nav>

        <div className="flex items-center gap-3">
          <NavLink to="/cart">
            <div className="relative">
              <IconButton
                ariaLabel="Ir al carrito"
                icon={
                  <span className="material-symbols-outlined text-[20px]">
                    shopping_cart
                  </span>
                }
              />
              {totalItems > 0 ? (
                <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-black text-on-primary">
                  {totalItems}
                </span>
              ) : null}
            </div>
          </NavLink>

          <NavLink to="/login">
            <IconButton
              ariaLabel="Ir a ingresar"
              icon={
                <span className="material-symbols-outlined text-[20px]">
                  account_circle
                </span>
              }
            />
          </NavLink>
        </div>
      </Container>
    </header>
  )
}
