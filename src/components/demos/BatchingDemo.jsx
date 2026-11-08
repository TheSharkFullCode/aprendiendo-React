import { useState } from 'react'

// Batching: React agrupa varios set en un solo render
export default function BatchingDemo() {
  const [a, setA] = useState(0)
  const [b, setB] = useState(0)

  const malSumar3 = () => {
    setA(a + 1) // a vale 0 en este render...
    setA(a + 1) // ...sigue valiendo 0
    setA(a + 1) // resultado: 1
  }

  const bienSumar3 = () => {
    setB((prev) => prev + 1) // usa el valor más reciente
    setB((prev) => prev + 1)
    setB((prev) => prev + 1) // resultado: +3
  }

  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <div className="rounded-xl bg-rosa/10 p-4 text-center">
        <p className="text-4xl font-bold text-rosa">{a}</p>
        <button onClick={malSumar3} className="mt-2 rounded-lg bg-rosa px-3 py-1 text-white">setA(a + 1) ×3</button>
      </div>
      <div className="rounded-xl bg-esmeralda/10 p-4 text-center">
        <p className="text-4xl font-bold text-esmeralda">{b}</p>
        <button onClick={bienSumar3} className="mt-2 rounded-lg bg-esmeralda px-3 py-1 text-white">setB(prev =&gt; prev + 1) ×3</button>
      </div>
    </div>
  )
}
