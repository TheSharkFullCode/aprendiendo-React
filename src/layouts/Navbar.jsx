import { useState } from 'react'
import { Link } from 'react-router-dom'
import useCuaderno from '../context/useCuaderno'
import EnlacesNav from './EnlacesNav'
import BarraProgreso from '../components/ui/BarraProgreso'

// Barra superior fija con logo, menú y progreso
export default function Navbar() {
  const { variables, progreso } = useCuaderno()
  const [abierto, setAbierto] = useState(false)

  return (
    <header className="sticky top-0 z-30 border-b border-primario/10 bg-white/85 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link to="/" className="flex items-center gap-2 font-extrabold">
          <img src="/logo.svg" alt="" className="h-9 w-9" />
          <span className="texto-degradado text-lg">{variables.SITIO.nombre}</span>
        </Link>
        <div className="hidden md:flex">
          <EnlacesNav />
        </div>
        <button
          onClick={() => setAbierto(!abierto)}
          className="rounded-lg p-2 text-2xl md:hidden"
          aria-label="Abrir menú"
        >
          {abierto ? '✕' : '☰'}
        </button>
      </nav>
      {abierto && (
        <div className="border-t border-primario/10 px-4 pb-4 md:hidden">
          <EnlacesNav vertical alPulsar={() => setAbierto(false)} />
        </div>
      )}
      <BarraProgreso valor={progreso} />
    </header>
  )
}
