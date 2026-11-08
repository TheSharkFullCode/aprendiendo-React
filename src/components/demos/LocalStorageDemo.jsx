import { useEffect, useState } from 'react'

// Guardar datos en el navegador para que sobrevivan a un F5
export default function LocalStorageDemo() {
  const [nota, setNota] = useState(() => localStorage.getItem('demo-nota') ?? '')

  useEffect(() => {
    localStorage.setItem('demo-nota', nota)
  }, [nota])

  return (
    <div className="space-y-2">
      <textarea
        value={nota}
        onChange={(e) => setNota(e.target.value)}
        rows={4}
        placeholder="Escribe una nota, recarga la página y seguirá aquí ✍️"
        className="w-full rounded-xl border bg-ambar/10 p-3"
      />
      <div className="flex items-center justify-between text-sm text-tinta/60">
        <span>{nota.length} caracteres guardados</span>
        <button onClick={() => setNota('')} className="text-rosa">Borrar nota</button>
      </div>
    </div>
  )
}
