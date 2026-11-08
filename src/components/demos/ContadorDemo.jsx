import { useState } from 'react'

// useState: guarda un valor y, al cambiarlo, React vuelve a pintar el componente
export default function ContadorDemo() {
  const [contador, setContador] = useState(0)

  const color = contador > 0 ? 'text-esmeralda' : contador < 0 ? 'text-rosa' : 'text-tinta'

  return (
    <div className="flex flex-col items-center gap-4">
      <p className={`text-6xl font-extrabold transition ${color}`}>{contador}</p>
      <div className="flex gap-2">
        <button onClick={() => setContador(contador - 1)} className="rounded-xl bg-rosa px-4 py-2 font-bold text-white">
          − 1
        </button>
        <button onClick={() => setContador(0)} className="rounded-xl bg-tinta/10 px-4 py-2 font-bold">
          Reset
        </button>
        <button onClick={() => setContador(contador + 1)} className="rounded-xl bg-esmeralda px-4 py-2 font-bold text-white">
          + 1
        </button>
      </div>
    </div>
  )
}
