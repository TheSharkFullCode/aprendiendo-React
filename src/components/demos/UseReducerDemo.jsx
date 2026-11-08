import { useReducer } from 'react'

const inicial = { items: [], total: 0 }
const productos = [{ id: 1, nombre: '☕ Café', precio: 1.5 }, { id: 2, nombre: '🥐 Croissant', precio: 2 }]

// reducer: función pura (estado, acción) => nuevo estado
function carritoReducer(estado, accion) {
  switch (accion.type) {
    case 'agregar':
      return { items: [...estado.items, accion.producto], total: estado.total + accion.producto.precio }
    case 'vaciar':
      return inicial
    default:
      return estado
  }
}

export default function UseReducerDemo() {
  const [estado, dispatch] = useReducer(carritoReducer, inicial)

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        {productos.map((p) => (
          <button key={p.id} onClick={() => dispatch({ type: 'agregar', producto: p })} className="rounded-lg bg-rosa/10 px-3 py-1.5">
            {p.nombre} +{p.precio} €
          </button>
        ))}
        <button onClick={() => dispatch({ type: 'vaciar' })} className="rounded-lg bg-tinta/10 px-3 py-1.5">🗑️ Vaciar</button>
      </div>
      <p>🛒 {estado.items.length} productos · <strong className="text-rosa">{estado.total.toFixed(2)} €</strong></p>
    </div>
  )
}
