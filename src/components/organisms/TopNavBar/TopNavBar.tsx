import { useState } from 'react'

import { NavLink, useNavigate } from 'react-router-dom'

import { Container, IconButton } from '@/components/atoms'
import { SearchBar } from '@/components/molecules/SearchBar'
import { useCartStore } from '@/store/cart.store'
import { useSessionStore } from '@/store/session.store'
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
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)

  const totalItems = useCartStore((s) => s.totalItems())
  const searchQuery = useUiStore((s) => s.searchQuery)
  const setSearchQuery = useUiStore((s) => s.setSearchQuery)

  const user = useSessionStore((s) => s.user)
  const logout = useSessionStore((s) => s.logout)

  const handleLogout = async () => {
    await logout()
    setMenuOpen(false)
    navigate('/')
  }

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
              {NAV_LINKS.filter((link) => !user || link.to !== '/login').map(renderLink)}
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

          <div className="relative">
            {user ? (
              <>
                <button
                  onClick={() => setMenuOpen(!menuOpen)}
                  className="flex items-center gap-2 rounded-lg p-1 transition-colors hover:bg-surface-container"
                >
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt={user.displayName || 'Usuario'}
                      className="h-8 w-8 rounded-full object-cover"
                    />
                  ) : (
                    <span className="material-symbols-outlined text-[28px] text-on-surface">
                      account_circle
                    </span>
                  )}
                </button>

                {menuOpen && (
                  <div className="absolute right-0 top-12 w-56 rounded-xl border border-outline-variant/15 bg-surface-container py-2 shadow-xl">
                    <div className="border-b border-outline-variant/10 px-4 py-3">
                      <p className="truncate text-sm text-on-surface">
                        Hola,{' '}
                        <span className="font-medium">
                          {user.displayName?.split(' ')[0] || user.email?.split('@')[0]}
                        </span>
                      </p>
                      <p className="truncate text-xs text-on-surface-variant">
                        {user.email}
                      </p>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="flex w-full items-center gap-3 px-4 py-2 text-sm text-on-surface hover:bg-surface-container-low"
                    >
                      <span className="material-symbols-outlined text-[20px]">
                        logout
                      </span>
                      Cerrar Sesion
                    </button>
                  </div>
                )}
              </>
            ) : (
              <NavLink to="/login">
                <IconButton
                  ariaLabel="Ir a ingresar"
                  icon={
                    <span className="material-symbols-outlined text-[20px]">
                      login
                    </span>
                  }
                />
              </NavLink>
            )}
          </div>
        </div>
      </Container>
    </header>
  )
}
