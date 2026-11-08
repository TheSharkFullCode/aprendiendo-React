import { useState } from 'react'
import useDebounce from '../../hooks/useDebounce'
import useLocalStorage from '../../hooks/useLocalStorage'

// Custom hooks: funciones "use..." que reutilizan lógica con otros hooks
export default function CustomHookDemo() {
  const [texto, setTexto] = useState('')
  const textoRetrasado = useDebounce(texto, 800)
  const [visitas, setVisitas] = useLocalStorage('demo-visitas', 0)

  return (
    <div className="space-y-4">
      <div>
        <p className="mb-1 font-bold">useDebounce</p>
        <input value={texto} onChange={(e) => setTexto(e.target.value)} placeholder="Escribe rápido..." className="w-full rounded-lg border px-3 py-1.5" />
        <p className="mt-1 text-sm">Al instante: <code>{texto}</code></p>
        <p className="text-sm">Tras 800 ms quieto: <code className="text-rosa">{textoRetrasado}</code></p>
      </div>
      <div>
        <p className="mb-1 font-bold">useLocalStorage</p>
        <button onClick={() => setVisitas(visitas + 1)} className="rounded-lg bg-rosa px-3 py-1.5 text-white">
          Me has pulsado {visitas} veces
        </button>
        <p className="text-xs text-tinta/60">Recarga la página (F5): el número se mantiene.</p>
      </div>
    </div>
  )
}
