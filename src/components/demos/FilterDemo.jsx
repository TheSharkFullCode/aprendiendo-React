import { useState } from 'react'

const lenguajes = [
  { id: 1, nombre: 'JavaScript', tipo: 'frontend' },
  { id: 2, nombre: 'TypeScript', tipo: 'frontend' },
  { id: 3, nombre: 'Python', tipo: 'backend' },
  { id: 4, nombre: 'Java', tipo: 'backend' },
  { id: 5, nombre: 'CSS', tipo: 'frontend' },
  { id: 6, nombre: 'SQL', tipo: 'backend' },
]

// .filter() + .map(): filtrar por texto y por tipo a la vez
export default function FilterDemo() {
  const [texto, setTexto] = useState('')
  const [tipo, setTipo] = useState('todos')

  const visibles = lenguajes
    .filter((l) => tipo === 'todos' || l.tipo === tipo)
    .filter((l) => l.nombre.toLowerCase().includes(texto.toLowerCase()))

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        <input value={texto} onChange={(e) => setTexto(e.target.value)} placeholder="Buscar..." className="flex-1 rounded-lg border px-3 py-1.5" />
        {['todos', 'frontend', 'backend'].map((t) => (
          <button key={t} onClick={() => setTipo(t)} className={`rounded-lg px-3 py-1.5 capitalize ${tipo === t ? 'bg-cian text-white' : 'bg-cian/10'}`}>
            {t}
          </button>
        ))}
      </div>
      <p className="text-sm text-tinta/60">{visibles.length} resultado(s)</p>
      <ul className="flex flex-wrap gap-2">
        {visibles.map((l) => (
          <li key={l.id} className="rounded-full bg-tinta px-3 py-1 text-sm text-white">{l.nombre}</li>
        ))}
      </ul>
      {visibles.length === 0 && <p className="text-rosa">No hay coincidencias 😢</p>}
    </div>
  )
}
