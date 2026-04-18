import { useEffect } from 'react'

import { RouterProvider } from 'react-router-dom'

import { router } from '@/app/AppRouter'
import { useSessionStore } from '@/store/session.store'

function App() {
  const initialize = useSessionStore((s) => s.initialize)

  useEffect(() => {
    initialize()
  }, [initialize])

  return <RouterProvider router={router} />
}

export default App
