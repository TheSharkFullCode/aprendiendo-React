import { createContext, useContext, useState } from 'react'

// 1) Crear el contexto
const TemaContext = createContext('claro')

// 3) Cualquier hijo, por profundo que esté, lo lee con useContext
function Caja() {
  const tema = useContext(TemaContext)
  const oscuro = tema === 'oscuro'
  return (
    <div className={`rounded-xl p-4 transition ${oscuro ? 'bg-tinta text-white' : 'bg-ambar/20'}`}>
      Soy un componente nieto y el tema es: <strong>{tema}</strong> {oscuro ? '🌙' : '☀️'}
    </div>
  )
}

function Intermedio() {
  return <Caja /> // ¡No necesita recibir ni pasar props!
}

export default function UseContextDemo() {
  const [tema, setTema] = useState('claro')

  // 2) Proveer el valor a todo el árbol
  return (
    <TemaContext.Provider value={tema}>
      <div className="space-y-3">
        <button
          onClick={() => setTema(tema === 'claro' ? 'oscuro' : 'claro')}
          className="rounded-lg bg-rosa px-3 py-1.5 font-bold text-white"
        >
          Cambiar tema
        </button>
        <Intermedio />
      </div>
    </TemaContext.Provider>
  )
}
