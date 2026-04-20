import { useState } from 'react'

import { NavLink, useNavigate, useLocation } from 'react-router-dom'

import { Container, IconButton } from '@/components/atoms'
import { SearchBar } from '@/components/molecules/SearchBar'
import { useCartStore } from '@/store/cart.store'
import { useSessionStore } from '@/store/session.store'
import { useUiStore } from '@/store/ui.store'

import { BRAND_NAME } from './TopNavBar.constants'
import type { TopNavBarLink } from './TopNavBar.types'

const NAV_LINKS_PUBLIC: readonly TopNavBarLink[] = [
  { to: '/', label: 'Tienda', end: true },
  { to: '/featured', label: 'Destacados' },
  { to: '/cart', label: 'Carrito' },
  { to: '/login', label: 'Ingresar' },
] as const

const NAV_LINKS_PRIVATE: readonly TopNavBarLink[] = [
  { to: '/', label: 'Tienda', end: true },
  { to: '/featured', label: 'Destacados' },
  { to: '/orders', label: 'Órdenes' },
  { to: '/profile', label: 'Perfil' },
  { to: '/cart', label: 'Carrito' },
] as const

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  [
    'text-sm transition-colors',
    isActive
      ? 'text-primary font-bold'
      : 'text-on-surface/70 hover:text-primary',
  ].join(' ')

export function TopNavBar() {
  const navigate = useNavigate()
  const location = useLocation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [profileMenuOpen, setProfileMenuOpen] = useState(false)

  const totalItems = useCartStore((s) => s.totalItems())
  const searchQuery = useUiStore((s) => s.searchQuery)
  const setSearchQuery = useUiStore((s) => s.setSearchQuery)

  const user = useSessionStore((s) => s.user)
  const logout = useSessionStore((s) => s.logout)

  // Hide cart on login/register pages
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register'
  const showCart = !isAuthPage
const closeMobileMenu = () => setMobileMenuOpen(false)

  // Toggle mobile menu - always close profile menu first
  const handleMobileMenuToggle = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (mobileMenuOpen) {
      setMobileMenuOpen(false)
    } else {
      setProfileMenuOpen(false)
      setMobileMenuOpen(true)
    }
  }

  // Toggle profile menu - always close mobile menu first
  const handleProfileMenuToggle = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (profileMenuOpen) {
      setProfileMenuOpen(false)
    } else {
      setMobileMenuOpen(false)
      setProfileMenuOpen(true)
    }
  }

  const handleLogout = async () => {
    await logout()
    setMobileMenuOpen(false)
    setProfileMenuOpen(false)
    navigate('/')
  }

  const navLinks = user ? NAV_LINKS_PRIVATE : NAV_LINKS_PUBLIC

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
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={navLinkClass}
              onClick={closeMobileMenu}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* Mobile menu button */}
        <button
          className="flex items-center justify-center p-2 md:hidden"
          onClick={handleMobileMenuToggle}
          aria-label="Abrir menu"
        >
          <span className="material-symbols-outlined text-[24px]">
            {mobileMenuOpen ? 'close' : 'menu'}
          </span>
        </button>

        <div className="flex items-center gap-3">
          {showCart && (
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
          )}

          <div className="relative">
            {user ? (
              <>
<button
                  onClick={handleProfileMenuToggle}
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
{profileMenuOpen && (
          <div className="absolute right-0 top-12 w-56 rounded-xl border border-outline-variant/15 bg-surface-container py-2 shadow-xl z-50">
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

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className="absolute left-0 right-0 top-full border-b border-outline-variant/10 bg-surface-container px-4 py-4 shadow-xl md:hidden z-50">
            <div className="flex flex-col gap-2">
{navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={navLinkClass}
                onClick={closeMobileMenu}
              >
                {link.label}
              </NavLink>
            ))}
            </div>
          </div>
        )}
      </Container>
      </header>
  )
}
