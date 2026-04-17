import { HOME_TITLE } from './HomePage.constants'
import type { HomeFeatureCard } from './HomePage.types'

import { NewsletterCallout } from '@/components/organisms/NewsletterCallout'

export function HomePage() {
  const cards: HomeFeatureCard[] = [
    {
      title: 'Novedades',
      description: 'Descubre lanzamientos recientes y ediciones limitadas.',
    },
    {
      title: 'Experiencia premium',
      description: 'Navegación rápida, diseño oscuro y foco en lo esencial.',
    },
  ]

  return (
    <div>
      <div className="mx-auto max-w-[1440px] px-6 py-16 md:px-8">
        <h1 className="font-headline text-4xl font-extrabold tracking-tight md:text-6xl">
          {HOME_TITLE}
        </h1>
        <p className="mt-4 max-w-2xl text-on-surface-variant">
          Selección curada de hardware y periféricos. Rendimiento, estética y precisión.
        </p>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {cards.map((card) => (
            <div
              key={card.title}
              className="rounded-3xl border border-outline-variant/10 bg-surface-container-low p-8 shadow-2xl"
            >
              <h2 className="font-headline text-xl font-bold">{card.title}</h2>
              <p className="mt-2 text-sm text-on-surface-variant">
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      <NewsletterCallout />
    </div>
  )
}
