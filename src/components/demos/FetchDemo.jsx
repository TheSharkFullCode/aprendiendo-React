import { useEffect, useState } from 'react'

// Pedir datos a una API: estados de carga, error y datos
export default function FetchDemo() {
  const [usuarios, setUsuarios] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)
  const [intento, setIntento] = useState(0)

  useEffect(() => {
    const controlador = new AbortController() // para cancelar si el componente se desmonta
    setCargando(true)
    setError(null)
    fetch('https://jsonplaceholder.typicode.com/users', { signal: controlador.signal })
      .then((res) => {
        if (!res.ok) throw new Error(`Error HTTP ${res.status}`)
        return res.json()
      })
      .then((datos) => setUsuarios(datos.slice(0, 5)))
      .catch((err) => err.name !== 'AbortError' && setError(err.message))
      .finally(() => setCargando(false))
    return () => controlador.abort()
  }, [intento])

  if (cargando) return <p className="animate-pulse text-cian">⏳ Cargando usuarios...</p>
  if (error) return <button onClick={() => setIntento(intento + 1)} className="text-rosa">❌ {error} · Reintentar</button>

  return (
    <div className="space-y-2">
      <ul className="space-y-1">
        {usuarios.map((u) => (
          <li key={u.id} className="rounded-lg bg-cian/10 px-3 py-1.5">
            <strong>{u.name}</strong> <span className="text-sm text-tinta/60">· {u.email}</span>
          </li>
        ))}
      </ul>
      <button onClick={() => setIntento(intento + 1)} className="rounded-lg bg-cian px-3 py-1 text-sm text-white">
        🔄 Volver a pedir
      </button>
    </div>
  )
}
