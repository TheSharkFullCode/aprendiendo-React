import { useDeferredValue, useId, useState, useTransition } from 'react'

const items = Array.from({ length: 3000 }, (_, i) => `Elemento ${i + 1}`)

// useId, useDeferredValue y useTransition en un solo ejemplo
export default function OtrosHooksDemo() {
  const id = useId()
  const [busqueda, setBusqueda] = useState('')
  const diferida = useDeferredValue(busqueda) // se actualiza "cuando React pueda"
  const [pendiente, startTransition] = useTransition()
  const [pestana, setPestana] = useState('lista')

  const filtrados = items.filter((x) => x.includes(diferida)).slice(0, 8)

  return (
    <div className="space-y-3">
      <label htmlFor={`${id}-buscar`} className="block text-sm font-bold">Buscar (id generado: {id})</label>
      <input id={`${id}-buscar`} value={busqueda} onChange={(e) => setBusqueda(e.target.value)} className="w-full rounded-lg border px-3 py-1.5" placeholder="Prueba con 12" />
      <div className="flex gap-2">
        {['lista', 'info'].map((p) => (
          <button key={p} onClick={() => startTransition(() => setPestana(p))} className={`rounded-lg px-3 py-1 ${pestana === p ? 'bg-rosa text-white' : 'bg-rosa/10'}`}>
            {p}
          </button>
        ))}
        {pendiente && <span className="text-sm">⏳</span>}
      </div>
      {pestana === 'lista' ? (
        <ul className={`grid grid-cols-2 gap-1 text-sm ${busqueda !== diferida ? 'opacity-50' : ''}`}>
          {filtrados.map((x) => <li key={x} className="rounded bg-rosa/5 px-2">{x}</li>)}
        </ul>
      ) : (
        <p className="text-sm">La lista se vuelve semitransparente mientras el valor diferido se pone al día.</p>
      )}
    </div>
  )
}
