import { NavLink } from 'react-router-dom'

import { Container } from '@/components/atoms'

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
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-outline-variant/10 bg-background/80 backdrop-blur-xl shadow-obsidian-nav">
      <Container className="flex items-center justify-between py-4">
        <NavLink
          to="/"
          className="font-headline text-xl font-black tracking-tight"
        >
          {BRAND_NAME}
        </NavLink>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map(renderLink)}
        </nav>
      </Container>
    </header>
  )
}
