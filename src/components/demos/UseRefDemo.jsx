import { useEffect, useRef, useState } from 'react'

// useRef: acceder al DOM y guardar valores que NO provocan re-render
export default function UseRefDemo() {
  const inputRef = useRef(null)
  const renders = useRef(0)
  const [texto, setTexto] = useState('')

  useEffect(() => {
    renders.current += 1 // cambia, pero no vuelve a pintar
  })

  return (
    <div className="space-y-3">
      <input
        ref={inputRef}
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
        placeholder="Escribe y mira el contador de renders"
        className="w-full rounded-lg border px-3 py-1.5"
      />
      <div className="flex flex-wrap gap-2">
        <button onClick={() => inputRef.current.focus()} className="rounded-lg bg-rosa px-3 py-1.5 text-white">
          🎯 Enfocar input
        </button>
        <button onClick={() => alert(`Valor: ${inputRef.current.value}`)} className="rounded-lg bg-tinta/10 px-3 py-1.5">
          Leer con ref
        </button>
      </div>
      <p className="text-sm text-tinta/60">Renders contados con useRef: {renders.current}</p>
    </div>
  )
}
