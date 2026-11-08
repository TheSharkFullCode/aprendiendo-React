import { useState } from 'react'
import ItemPregunta from './ItemPregunta'

// Acordeón: solo una pregunta abierta a la vez
export default function ListaPreguntas({ preguntas, abiertaInicial = 0 }) {
  const [abierta, setAbierta] = useState(abiertaInicial)

  if (preguntas.length === 0) {
    return <p className="rounded-3xl bg-white p-10 text-center text-tinta/60">😢 Ninguna pregunta coincide.</p>
  }

  return (
    <div className="space-y-3">
      <p className="text-sm font-semibold text-tinta/50">{preguntas.length} preguntas</p>
      {preguntas.map((p) => (
        <ItemPregunta
          key={p.n}
          pregunta={p}
          abierta={abierta === p.n}
          alPulsar={() => setAbierta(abierta === p.n ? 0 : p.n)}
        />
      ))}
    </div>
  )
}
