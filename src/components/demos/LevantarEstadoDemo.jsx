import { useState } from 'react'

// Dos hermanos NO se hablan directamente: el estado sube al padre común
function Termometro({ grados, alCambiar }) {
  return <input type="range" min="-10" max="45" value={grados} onChange={(e) => alCambiar(Number(e.target.value))} className="w-full" />
}

function Aviso({ grados }) {
  const mensaje = grados < 10 ? '🥶 ¡Abrígate!' : grados < 28 ? '😎 Temperatura perfecta' : '🥵 ¡Mucho calor!'
  return <p className="text-lg font-bold">{grados} °C → {mensaje}</p>
}

export default function LevantarEstadoDemo() {
  const [grados, setGrados] = useState(20) // el estado vive en el PADRE

  return (
    <div className="space-y-3">
      <Termometro grados={grados} alCambiar={setGrados} />
      <Aviso grados={grados} />
    </div>
  )
}
