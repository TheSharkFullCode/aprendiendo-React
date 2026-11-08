// Input de búsqueda controlado (el estado vive en el padre o en el contexto)
export default function Buscador({ valor, alCambiar, placeholder = 'Buscar...' }) {
  return (
    <div className="relative w-full">
      <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-lg">🔎</span>
      <input
        type="search"
        value={valor}
        onChange={(e) => alCambiar(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-2xl border-2 border-primario/15 bg-white py-3 pl-12 pr-4 font-medium shadow-sm outline-none transition focus:border-primario focus:ring-4 focus:ring-primario/15"
      />
    </div>
  )
}
