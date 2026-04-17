import { Outlet } from 'react-router-dom'

import { Footer } from '@/components/organisms/Footer'
import { TopNavBar } from '@/components/organisms/TopNavBar'

export function MainLayout() {
  return (
    <div className="min-h-screen bg-background text-on-surface">
      <TopNavBar />

      <main className="pt-20">
        <Outlet />
      </main>

      <Footer />
    </div>
  )
}
