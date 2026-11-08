import { Link } from 'react-router-dom'
import useCuaderno from '../../context/useCuaderno'
import TituloBloque from './TituloBloque'

// Enlaces a las preguntas de entrevista relacionadas con el tema
export default function PreguntasRelacionadas({ numeros = [] }) {
  const { preguntas } = useCuaderno()
  const relacionadas = preguntas.filter((p) => numeros.includes(p.n))
  if (relacionadas.length === 0) return null

  return (
    <section>
      <TituloBloque icono="🎤" color="bg-naranja">Te lo pueden preguntar en una entrevista</TituloBloque>
      <ul className="grid gap-2 sm:grid-cols-2">
        {relacionadas.map((p) => (
          <li key={p.n}>
            <Link
              to={`/preguntas?n=${p.n}`}
              className="flex gap-3 rounded-2xl bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <span className="font-extrabold text-naranja">{p.n}</span>
              <span className="text-sm font-semibold">{p.pregunta}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
