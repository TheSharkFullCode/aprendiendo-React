import { Link } from 'react-router-dom'
import useCuaderno from '../../context/useCuaderno'

// Ruta de aprendizaje: todos los temas en orden, marcando los completados
export default function RutaAprendizaje() {
  const { temas, completados, variables } = useCuaderno()

  return (
    <section>
      <h2 className="mb-2 text-3xl font-extrabold">🗺️ Ruta de aprendizaje</h2>
      <p className="mb-6 text-tinta/60">Sigue el orden: cada tema usa lo que aprendiste en el anterior.</p>
      <ol className="flex flex-wrap gap-2">
        {temas.map((t) => {
          const hecho = completados.includes(t.id)
          const cat = variables.CATEGORIAS[t.categoria]
          return (
            <li key={t.id}>
              <Link
                to={`/temas/${t.id}`}
                className={`flex items-center gap-2 rounded-full border-2 px-3 py-1.5 text-sm font-semibold transition hover:-translate-y-0.5 ${
                  hecho ? 'border-esmeralda bg-esmeralda text-white' : `${cat.borde} bg-white`
                }`}
              >
                <span className="text-xs opacity-60">{t.numero}</span>
                {hecho ? '✓' : t.icono} {t.titulo}
              </Link>
            </li>
          )
        })}
      </ol>
    </section>
  )
}
