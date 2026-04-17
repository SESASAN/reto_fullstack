import { NavLink, Outlet } from 'react-router-dom'

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  [
    'text-sm transition-colors',
    isActive ? 'text-primary font-bold' : 'text-on-surface/70 hover:text-primary',
  ].join(' ')

export function MainLayout() {
  return (
    <div className="min-h-screen bg-background text-on-surface">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-outline-variant/10 bg-background/80 backdrop-blur-xl shadow-obsidian-nav">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-6 py-4 md:px-8">
          <NavLink to="/" className="font-headline text-xl font-black tracking-tight">
            OBSIDIAN
          </NavLink>

          <nav className="hidden items-center gap-8 md:flex">
            <NavLink to="/" className={navLinkClass} end>
              Tienda
            </NavLink>
            <NavLink to="/cart" className={navLinkClass}>
              Carrito
            </NavLink>
            <NavLink to="/login" className={navLinkClass}>
              Ingresar
            </NavLink>
          </nav>

          <div className="flex items-center gap-3">
            <NavLink
              to="/cart"
              aria-label="Ir al carrito"
              className="rounded-lg border border-outline-variant/20 bg-surface-container-low px-3 py-2 text-sm font-semibold text-on-surface hover:bg-surface-container-high"
            >
              <span className="material-symbols-outlined align-[-4px] text-[18px]">
                shopping_cart
              </span>
            </NavLink>
          </div>
        </div>
      </header>

      <main className="pt-20">
        <Outlet />
      </main>

      <footer className="border-t border-outline-variant/10 bg-surface-container-lowest px-6 py-10 md:px-8">
        <div className="mx-auto max-w-[1440px] text-xs text-on-surface/50">
          © {new Date().getFullYear()} OBSIDIAN. Todos los derechos reservados.
        </div>
      </footer>
    </div>
  )
}
