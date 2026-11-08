// Pastillas de categoría para las preguntas
export default function FiltroPreguntas({ categorias, activa, alCambiar }) {
  return (
    <div className="flex flex-wrap gap-2">
      {categorias.map((c) => (
        <button
          key={c}
          onClick={() => alCambiar(c)}
          className={`rounded-full px-4 py-2 text-sm font-bold transition ${
            activa === c ? 'bg-naranja text-white shadow-lg shadow-naranja/30' : 'bg-white text-tinta/70 shadow-sm hover:-translate-y-0.5'
          }`}
        >
          {c}
        </button>
      ))}
    </div>
  )
}
