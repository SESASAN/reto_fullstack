export const FOOTER_COLUMNS = [
  {
    title: 'Categorías',
    links: [
      { label: 'Electrónica', href: '#' },
      { label: 'Joyería', href: '#' },
      { label: 'Ropa de hombre', href: '#' },
      { label: 'Ropa de mujer', href: '#' },
    ],
  },
  {
    title: 'Atención',
    links: [
      { label: 'Centro de ayuda', href: '#' },
      { label: 'Garantía', href: '#' },
      { label: 'Cambios y devoluciones', href: '#' },
      { label: 'Envíos', href: '#' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacidad', href: '#' },
      { label: 'Términos', href: '#' },
      { label: 'Cookies', href: '#' },
    ],
  },
] as const

export const FOOTER_COPYRIGHT =
  '© ' + new Date().getFullYear() + ' OBSIDIAN. Todos los derechos reservados.'
