import { useState } from 'react'

// Componente hijo: recibe datos por props (solo lectura) y children
function Tarjeta({ nombre, rol, color, children }) {
  return (
    <div className={`rounded-xl border-l-4 bg-white p-4 shadow ${color}`}>
      <h4 className="font-bold">{nombre}</h4>
      <p className="text-sm text-tinta/60">{rol}</p>
      <div className="mt-2">{children}</div>
    </div>
  )
}

// Componente padre: decide QUÉ props enviar
export default function PropsDemo() {
  const [rol, setRol] = useState('Desarrollador Junior')

  return (
    <div className="space-y-3">
      <Tarjeta nombre="Oscar" rol={rol} color="border-primario">
        <button
          onClick={() => setRol('Desarrollador Senior 🚀')}
          className="rounded-lg bg-primario px-3 py-1 text-sm text-white"
        >
          Ascender
        </button>
      </Tarjeta>
      <Tarjeta nombre="Ana" rol="Diseñadora UX" color="border-rosa">
        <em>Soy el children de esta tarjeta</em>
      </Tarjeta>
    </div>
  )
}
