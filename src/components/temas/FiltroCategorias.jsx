import useCuaderno from '../../context/useCuaderno'

// Botones de filtro generados a partir de variables.CATEGORIAS
export default function FiltroCategorias({ activa, alCambiar }) {
  const { variables } = useCuaderno()
  const opciones = [['todas', { nombre: 'Todas', icono: '✨', fondo: 'bg-tinta' }], ...Object.entries(variables.CATEGORIAS)]

  return (
    <div className="flex flex-wrap gap-2">
      {opciones.map(([clave, cat]) => (
        <button
          key={clave}
          onClick={() => alCambiar(clave)}
          className={`rounded-full px-4 py-2 text-sm font-bold transition ${
            activa === clave ? `${cat.fondo} text-white shadow-lg` : 'bg-white text-tinta/70 shadow-sm hover:-translate-y-0.5'
          }`}
        >
          {cat.icono} {cat.nombre}
        </button>
      ))}
    </div>
  )
}
