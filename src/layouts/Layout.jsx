import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import useScrollArriba from '../hooks/useScrollArriba'
import Cargando from '../components/ui/Cargando'

// Estructura común: Navbar arriba, página en medio (Outlet), Footer abajo
export default function Layout() {
  useScrollArriba()

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="hoja flex-1">
        <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:py-12">
          <Suspense fallback={<Cargando />}>
            <Outlet />
          </Suspense>
        </div>
      </main>
      <Footer />
    </div>
  )
}
