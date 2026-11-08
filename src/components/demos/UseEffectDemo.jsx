import { useEffect, useState } from 'react'

// useEffect: ejecutar código DESPUÉS de pintar (temporizadores, APIs, título...)
export default function UseEffectDemo() {
  const [segundos, setSegundos] = useState(0)
  const [activo, setActivo] = useState(false)

  // Se ejecuta cada vez que "activo" cambia
  useEffect(() => {
    if (!activo) return
    const id = setInterval(() => setSegundos((s) => s + 1), 1000)
    return () => clearInterval(id) // limpieza: se ejecuta antes del siguiente efecto
  }, [activo])

  // Cambia el título de la pestaña del navegador
  useEffect(() => {
    document.title = activo ? `⏱️ ${segundos}s` : 'Cuaderno React'
    return () => { document.title = 'Cuaderno React' }
  }, [segundos, activo])

  return (
    <div className="flex flex-col items-center gap-3">
      <p className="font-mono text-5xl font-bold text-rosa">{segundos}s</p>
      <div className="flex gap-2">
        <button onClick={() => setActivo(!activo)} className="rounded-xl bg-rosa px-4 py-2 font-bold text-white">
          {activo ? '⏸ Pausar' : '▶ Iniciar'}
        </button>
        <button onClick={() => setSegundos(0)} className="rounded-xl bg-tinta/10 px-4 py-2 font-bold">Reset</button>
      </div>
      <p className="text-sm text-tinta/60">Mira el título de la pestaña del navegador 👆</p>
    </div>
  )
}
