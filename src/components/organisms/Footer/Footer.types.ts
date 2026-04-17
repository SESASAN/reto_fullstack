export type FooterLink = {
  readonly label: string
  readonly href: string
}

export type FooterColumn = {
  readonly title: string
  readonly links: readonly FooterLink[]
}
