import heroImg from '@/assets/hero.png'
import { Button, Container } from '@/components/atoms'

import {
  HERO_BADGE,
  HERO_DESCRIPTION,
  HERO_PRIMARY_CTA,
  HERO_SECONDARY_CTA,
  HERO_TITLE_LINE_1,
  HERO_TITLE_LINE_2,
} from './HeroSection.constants'
import type { HeroSectionProps } from './HeroSection.types'

export function HeroSection({ onPrimaryClick, onSecondaryClick }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden">
      <Container className="relative flex min-h-[520px] items-center py-16 md:min-h-[720px]">
        <div className="relative z-10 max-w-2xl">
          <span className="inline-flex items-center rounded-full border border-outline-variant/20 bg-surface-container-highest px-3 py-1 text-[10px] font-black tracking-[0.2em] text-primary">
            {HERO_BADGE}
          </span>

          <h1 className="mt-6 font-headline text-5xl font-black tracking-tight text-on-surface md:text-7xl lg:text-8xl">
            {HERO_TITLE_LINE_1}
            <br />
            <span className="text-primary">{HERO_TITLE_LINE_2}</span>
          </h1>

          <p className="mt-6 max-w-md text-base leading-relaxed text-on-surface-variant md:text-lg">
            {HERO_DESCRIPTION}
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <Button onClick={onPrimaryClick} size="lg">
              {HERO_PRIMARY_CTA}
            </Button>
            <Button onClick={onSecondaryClick} variant="secondary" size="lg">
              {HERO_SECONDARY_CTA}
            </Button>
          </div>
        </div>

        <div className="pointer-events-none absolute right-[-12%] top-1/2 hidden h-full w-[60%] -translate-y-1/2 opacity-70 md:block">
          <img
            src={heroImg}
            alt=""
            className="h-full w-full object-cover"
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent via-background/20 to-background" />
        </div>

        <div className="pointer-events-none absolute inset-0 bg-obsidian-hero" />
      </Container>
    </section>
  )
}
