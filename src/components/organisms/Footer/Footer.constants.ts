export const FOOTER_COLUMNS = [
  {
    title: 'Ecosistema',
    links: [
      { label: 'Hardware', href: '#' },
      { label: 'Software', href: '#' },
      { label: 'Firmware', href: '#' },
      { label: 'Archivo', href: '#' },
    ],
  },
  {
    title: 'Soporte',
    links: [
      { label: 'Soporte técnico', href: '#' },
      { label: 'Garantía', href: '#' },
      { label: 'Documentación', href: '#' },
      { label: 'Envíos', href: '#' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacidad', href: '#' },
      { label: 'Términos', href: '#' },
      { label: 'Seguridad', href: '#' },
    ],
  },
] as const

export const FOOTER_COPYRIGHT =
  '© ' + new Date().getFullYear() + ' OBSIDIAN. Todos los derechos reservados.'
