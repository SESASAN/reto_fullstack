import { Link } from 'react-router-dom'

import {
  NOT_FOUND_CTA,
  NOT_FOUND_DESCRIPTION,
  NOT_FOUND_TITLE,
} from './NotFoundPage.constants'

export function NotFoundPage() {
  return (
    <div className="mx-auto max-w-[1440px] px-6 py-24 md:px-8">
      <h1 className="font-headline text-3xl font-extrabold tracking-tight">
        {NOT_FOUND_TITLE}
      </h1>
      <p className="mt-2 text-on-surface-variant">
        {NOT_FOUND_DESCRIPTION}
      </p>
      <Link
        to="/"
        className="mt-8 inline-flex items-center rounded-xl bg-obsidian-primary px-6 py-3 font-bold text-on-primary shadow-lg shadow-primary/20"
      >
        {NOT_FOUND_CTA}
      </Link>
    </div>
  )
}
