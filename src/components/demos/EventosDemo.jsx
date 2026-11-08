import { useState } from 'react'

// Eventos: onClick, onMouseEnter, onChange, onKeyDown...
export default function EventosDemo() {
  const [log, setLog] = useState('Interactúa con los elementos 👇')

  const manejarClick = (color) => setLog(`Has pulsado el botón ${color}`)

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        <button onClick={() => manejarClick('rosa')} className="rounded-lg bg-rosa px-3 py-1.5 text-white">
          Rosa
        </button>
        <button onClick={() => manejarClick('cian')} className="rounded-lg bg-cian px-3 py-1.5 text-white">
          Cian
        </button>
        <span
          onMouseEnter={() => setLog('El ratón ha entrado en la caja 🐭')}
          className="rounded-lg bg-ambar/20 px-3 py-1.5"
        >
          Pasa el ratón
        </span>
      </div>
      <input
        onKeyDown={(e) => setLog(`Tecla pulsada: "${e.key}"`)}
        placeholder="Escribe algo..."
        className="w-full rounded-lg border px-3 py-1.5"
      />
      <p className="rounded-lg bg-tinta px-3 py-2 font-mono text-sm text-esmeralda">{log}</p>
    </div>
  )
}
