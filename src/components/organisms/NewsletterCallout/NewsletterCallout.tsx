import { useState } from 'react'

import { Button, Container, Input } from '@/components/atoms'

import {
  NEWSLETTER_BUTTON_LABEL,
  NEWSLETTER_DESCRIPTION,
  NEWSLETTER_PLACEHOLDER,
  NEWSLETTER_TITLE,
} from './NewsletterCallout.constants'
import type { NewsletterCalloutProps } from './NewsletterCallout.types'

export function NewsletterCallout({ onSubmit }: NewsletterCalloutProps) {
  const [email, setEmail] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit?.(email)
  }

  return (
    <section className="py-16">
      <Container>
        <div className="relative overflow-hidden rounded-3xl border border-outline-variant/10 bg-surface-container-low p-10 shadow-2xl md:p-16">
          <div className="pointer-events-none absolute inset-0 bg-obsidian-hero" />

          <div className="relative mx-auto max-w-2xl text-center">
            <h2 className="font-headline text-3xl font-black tracking-tight md:text-4xl">
              {NEWSLETTER_TITLE}
            </h2>
            <p className="mt-4 text-on-surface-variant">{NEWSLETTER_DESCRIPTION}</p>

            <form
              onSubmit={handleSubmit}
              className="mt-8 flex flex-col gap-3 sm:flex-row"
            >
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={NEWSLETTER_PLACEHOLDER}
                aria-label={NEWSLETTER_PLACEHOLDER}
              />
              <Button type="submit" className="sm:w-auto" fullWidth>
                {NEWSLETTER_BUTTON_LABEL}
              </Button>
            </form>
          </div>
        </div>
      </Container>
    </section>
  )
}
