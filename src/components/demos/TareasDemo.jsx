import { useState } from 'react'

// Arrays en el estado SIN mutarlos: añadir (spread), editar (map), borrar (filter)
export default function TareasDemo() {
  const [tareas, setTareas] = useState([{ id: 1, texto: 'Aprender useState', hecha: true }])
  const [nueva, setNueva] = useState('')

  const agregar = (e) => {
    e.preventDefault()
    if (!nueva.trim()) return
    setTareas([...tareas, { id: Date.now(), texto: nueva, hecha: false }])
    setNueva('')
  }
  const alternar = (id) => setTareas(tareas.map((t) => (t.id === id ? { ...t, hecha: !t.hecha } : t)))
  const borrar = (id) => setTareas(tareas.filter((t) => t.id !== id))

  return (
    <div className="space-y-3">
      <form onSubmit={agregar} className="flex gap-2">
        <input value={nueva} onChange={(e) => setNueva(e.target.value)} placeholder="Nueva tarea" className="flex-1 rounded-lg border px-3 py-1.5" />
        <button className="rounded-lg bg-primario px-4 font-bold text-white">Añadir</button>
      </form>
      <ul className="space-y-1">
        {tareas.map((t) => (
          <li key={t.id} className="flex items-center gap-2 rounded-lg bg-primario/5 px-3 py-2">
            <input type="checkbox" checked={t.hecha} onChange={() => alternar(t.id)} />
            <span className={`flex-1 ${t.hecha ? 'text-tinta/40 line-through' : ''}`}>{t.texto}</span>
            <button onClick={() => borrar(t.id)} className="text-rosa">🗑️</button>
          </li>
        ))}
      </ul>
      <p className="text-sm text-tinta/60">
        Hechas: {tareas.filter((t) => t.hecha).length} / {tareas.length}
      </p>
    </div>
  )
}
