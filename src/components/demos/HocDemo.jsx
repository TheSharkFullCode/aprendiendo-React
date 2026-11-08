import { useEffect, useState } from 'react'

// HOC: función que recibe un componente y devuelve otro "mejorado"
function conCargando(Componente) {
  return function ConCargando({ cargando, ...props }) {
    if (cargando) return <p className="animate-pulse text-esmeralda">⏳ Cargando datos...</p>
    return <Componente {...props} />
  }
}

function ListaUsuarios({ usuarios }) {
  return <ul className="list-inside list-disc">{usuarios.map((u) => <li key={u}>{u}</li>)}</ul>
}

const ListaConCargando = conCargando(ListaUsuarios)

export default function HocDemo() {
  const [cargando, setCargando] = useState(true)
  const [usuarios, setUsuarios] = useState([])

  const cargar = () => {
    setCargando(true)
    setTimeout(() => { setUsuarios(['Oscar', 'Lucía', 'Ana']); setCargando(false) }, 1500)
  }
  useEffect(cargar, [])

  return (
    <div className="space-y-2">
      <ListaConCargando cargando={cargando} usuarios={usuarios} />
      <button onClick={cargar} className="rounded-lg bg-esmeralda px-3 py-1 text-sm text-white">Recargar</button>
    </div>
  )
}
