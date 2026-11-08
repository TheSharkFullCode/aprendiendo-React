import { useState } from 'react'

// Renderizado condicional: ternario ( ? : ), && y return temprano
export default function TernarioDemo() {
  const [logueado, setLogueado] = useState(false)
  const [mensajes, setMensajes] = useState(3)

  return (
    <div className="space-y-3">
      {/* Ternario: una cosa U otra */}
      <p className="text-lg font-bold">
        {logueado ? '👋 Bienvenido de nuevo, Oscar' : '🔒 Por favor, inicia sesión'}
      </p>

      {/* &&: se muestra SOLO si la condición es verdadera */}
      {logueado && mensajes > 0 && (
        <p className="rounded-lg bg-rosa/10 p-2 text-rosa">📬 Tienes {mensajes} mensajes nuevos</p>
      )}

      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setLogueado(!logueado)}
          className={`rounded-lg px-3 py-1.5 font-bold text-white ${logueado ? 'bg-rosa' : 'bg-esmeralda'}`}
        >
          {logueado ? 'Cerrar sesión' : 'Iniciar sesión'}
        </button>
        <button onClick={() => setMensajes(0)} className="rounded-lg bg-tinta/10 px-3 py-1.5">
          Leer mensajes
        </button>
      </div>
    </div>
  )
}
