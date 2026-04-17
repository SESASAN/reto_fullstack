import { NewsletterCallout } from '@/components/organisms/NewsletterCallout'
import { HeroSection } from '@/components/organisms/HeroSection'
import { ProductGridSection } from '@/components/organisms/ProductGridSection'

export function HomePage() {
  return (
    <div>
      <HeroSection />
      <ProductGridSection />
      <NewsletterCallout />
    </div>
  )
}
