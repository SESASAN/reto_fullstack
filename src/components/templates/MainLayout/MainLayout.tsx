import { Outlet } from 'react-router-dom'

import { Footer } from '@/components/organisms/Footer'
import { TopNavBar } from '@/components/organisms/TopNavBar'

export function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-transparent text-on-surface relative">
      <TopNavBar />

      <main className="flex-grow pt-20">
        <Outlet />
      </main>

      <Footer />
    </div>
  )
}
