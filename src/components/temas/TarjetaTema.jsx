import { Link } from 'react-router-dom'
import useCuaderno from '../../context/useCuaderno'
import Etiqueta from '../ui/Etiqueta'

// Tarjeta de un tema en el índice
export default function TarjetaTema({ tema, retraso = 0 }) {
  const { variables, completados } = useCuaderno()
  const cat = variables.CATEGORIAS[tema.categoria]
  const nivel = variables.NIVELES[tema.nivel]
  const hecho = completados.includes(tema.id)

  return (
    <Link
      to={`/temas/${tema.id}`}
      style={{ animationDelay: `${retraso}ms` }}
      className="group relative flex animate-aparecer flex-col overflow-hidden rounded-3xl border border-tinta/5 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
    >
      <span className={`absolute inset-x-0 top-0 h-1.5 ${cat.fondo}`} />
      <div className="flex items-start justify-between">
        <span className={`grid h-12 w-12 place-items-center rounded-2xl text-2xl ${cat.suave}`}>{tema.icono}</span>
        <span className="text-sm font-bold text-tinta/30">#{tema.numero}</span>
      </div>
      <h3 className="mt-4 text-xl font-extrabold group-hover:text-primario">{tema.titulo}</h3>
      <p className="mt-1 flex-1 text-sm text-tinta/60">{tema.resumen}</p>
      <div className="mt-4 flex flex-wrap items-center gap-2">
        <Etiqueta className={`${cat.suave} ${cat.texto}`}>{cat.nombre}</Etiqueta>
        <Etiqueta className={nivel.clase}>{nivel.texto}</Etiqueta>
        {tema.demos?.length > 0 && <Etiqueta className="bg-tinta/5 text-tinta/60">🎮 {tema.demos.length}</Etiqueta>}
        {hecho && <Etiqueta className="bg-esmeralda text-white">✓ Hecho</Etiqueta>}
      </div>
    </Link>
  )
}
