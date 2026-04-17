import { Container } from '@/components/atoms'

import { FOOTER_COLUMNS, FOOTER_COPYRIGHT } from './Footer.constants'
import type { FooterColumn } from './Footer.types'

const renderColumn = (column: FooterColumn) => (
  <div key={column.title} className="space-y-4">
    <h4 className="text-primary text-sm font-bold tracking-widest uppercase">
      {column.title}
    </h4>
    <ul className="space-y-2 text-sm text-on-surface/50">
      {column.links.map((link) => (
        <li key={link.label}>
          <a className="hover:text-primary transition-colors" href={link.href}>
            {link.label}
          </a>
        </li>
      ))}
    </ul>
  </div>
)

export function Footer() {
  return (
    <footer className="border-t border-outline-variant/10 bg-surface-container-lowest py-12">
      <Container>
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
          <div className="space-y-4">
            <div className="font-headline text-lg font-black tracking-tight">
              OBSIDIAN
            </div>
            <p className="text-sm text-on-surface/50">
              Tienda online con una selección cuidada de productos para diferentes estilos y necesidades.
            </p>
          </div>

          {FOOTER_COLUMNS.map(renderColumn)}
        </div>

        <div className="mt-12 border-t border-outline-variant/10 pt-8 text-xs text-on-surface/50">
          {FOOTER_COPYRIGHT}
        </div>
      </Container>
    </footer>
  )
}
