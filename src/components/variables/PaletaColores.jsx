import useCuaderno from '../../context/useCuaderno'
import useCopiar from '../../hooks/useCopiar'

// Muestras de color de variables.COLORES (clic = copiar HEX)
export default function PaletaColores() {
  const { variables } = useCuaderno()
  const { copiado, copiar } = useCopiar()

  return (
    <section>
      <h2 className="mb-1 text-2xl font-extrabold">🎨 COLORES</h2>
      <p className="mb-4 text-sm text-tinta/60">Definidos en index.css con @theme. Pulsa una muestra para copiar su HEX.</p>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {variables.COLORES.map((c) => (
          <button key={c.nombre} onClick={() => copiar(c.hex)} className="overflow-hidden rounded-3xl bg-white text-left shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
            <div className={`h-24 ${c.clase} ${c.nombre === 'papel' ? 'border-b border-tinta/10' : ''}`} />
            <div className="p-4">
              <p className="font-bold">{c.nombre}</p>
              <p className="font-mono text-sm text-tinta/60">{c.hex}</p>
              <p className="mt-1 text-xs text-tinta/50">{c.uso}</p>
              <code className="mt-2 inline-block rounded bg-tinta/5 px-2 text-xs">{c.clase}</code>
            </div>
          </button>
        ))}
      </div>
      {copiado && <p className="mt-3 font-bold text-esmeralda">✓ Copiado al portapapeles</p>}
    </section>
  )
}
