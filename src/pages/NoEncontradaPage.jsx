import { Link } from 'react-router-dom'

// Ruta "*": cualquier URL que no exista
export default function NoEncontradaPage() {
  return (
    <div className="py-20 text-center">
      <p className="texto-degradado text-8xl font-extrabold">404</p>
      <p className="mt-4 text-xl text-tinta/70">Esta página no está en el cuaderno 📓</p>
      <Link to="/" className="mt-8 inline-block rounded-2xl bg-primario px-6 py-3 font-bold text-white">
        Volver al inicio
      </Link>
    </div>
  )
}
