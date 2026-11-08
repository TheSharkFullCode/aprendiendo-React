// Botón reutilizable con variantes de color
const VARIANTES = {
  primario: 'bg-primario text-white shadow-lg shadow-primario/30 hover:bg-primario/90',
  rosa: 'bg-rosa text-white shadow-lg shadow-rosa/30 hover:bg-rosa/90',
  cian: 'bg-cian text-white shadow-lg shadow-cian/30 hover:bg-cian/90',
  esmeralda: 'bg-esmeralda text-white shadow-lg shadow-esmeralda/30 hover:bg-esmeralda/90',
  suave: 'bg-primario/10 text-primario hover:bg-primario/20',
  borde: 'border-2 border-primario/20 text-tinta hover:border-primario hover:text-primario',
}

export default function Boton({ variante = 'primario', className = '', children, ...resto }) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-bold transition active:scale-95 disabled:opacity-40 ${VARIANTES[variante]} ${className}`}
      {...resto}
    >
      {children}
    </button>
  )
}
