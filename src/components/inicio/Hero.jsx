import { Link } from 'react-router-dom'
import useCuaderno from '../../context/useCuaderno'
import Etiqueta from '../ui/Etiqueta'
import TarjetaFlotante from './TarjetaFlotante'

// Portada principal con llamada a la acción
export default function Hero() {
  const { variables, temas, completados } = useCuaderno()
  const siguiente = temas.find((t) => !completados.includes(t.id)) ?? temas[0]

  return (
    <section className="grid animate-aparecer items-center gap-10 lg:grid-cols-2">
      <div>
        <Etiqueta>✨ {variables.SITIO.stack.join(' · ')}</Etiqueta>
        <h1 className="mt-4 text-5xl font-extrabold leading-tight sm:text-6xl">
          Tu cuaderno para <span className="texto-degradado">dominar React</span>
        </h1>
        <p className="mt-4 max-w-xl text-lg text-tinta/70">{variables.SITIO.lema}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            to={`/temas/${siguiente.id}`}
            className="rounded-2xl bg-gradient-to-r from-primario to-rosa px-6 py-3 font-bold text-white shadow-xl shadow-primario/30 transition hover:-translate-y-0.5"
          >
            {completados.length ? 'Continuar' : 'Empezar'}: {siguiente.titulo} →
          </Link>
          <Link to="/preguntas" className="rounded-2xl border-2 border-primario/20 px-6 py-3 font-bold transition hover:border-primario">
            🎤 Preparar entrevista
          </Link>
        </div>
      </div>
      <TarjetaFlotante />
    </section>
  )
}
