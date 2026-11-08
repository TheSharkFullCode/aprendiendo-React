import { useEffect, useRef } from 'react'
import Etiqueta from '../ui/Etiqueta'
import RespuestaPregunta from './RespuestaPregunta'

// Una pregunta del acordeón
export default function ItemPregunta({ pregunta, abierta, alPulsar }) {
  const ref = useRef(null)

  // Si llega abierta desde un enlace (?n=..), hacemos scroll hasta ella
  useEffect(() => {
    if (abierta) ref.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div ref={ref} className={`overflow-hidden rounded-3xl bg-white shadow-sm transition ${abierta ? 'ring-2 ring-naranja/40' : ''}`}>
      <button onClick={alPulsar} className="flex w-full items-center gap-4 p-5 text-left">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-naranja/10 font-extrabold text-naranja">
          {pregunta.n}
        </span>
        <span className="flex-1 font-bold">{pregunta.pregunta}</span>
        <Etiqueta className="hidden bg-tinta/5 text-tinta/60 sm:inline-flex">{pregunta.categoria}</Etiqueta>
        <span className={`text-xl transition ${abierta ? 'rotate-45 text-naranja' : ''}`}>+</span>
      </button>
      {abierta && <RespuestaPregunta pregunta={pregunta} />}
    </div>
  )
}
