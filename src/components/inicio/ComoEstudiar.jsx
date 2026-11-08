// Explica la estructura de cada tema del cuaderno
const PASOS = [
  { icono: '🤔', titulo: '¿Qué es?', texto: 'Teoría clara y sin rodeos.', color: 'bg-primario' },
  { icono: '🛠️', titulo: '¿Cómo se usa?', texto: 'Código comentado listo para copiar.', color: 'bg-rosa' },
  { icono: '🎮', titulo: 'Pruébalo', texto: 'Demos reales que puedes tocar.', color: 'bg-cian' },
  { icono: '🧠', titulo: 'Recuerda', texto: 'Errores típicos y claves para entrevistas.', color: 'bg-esmeralda' },
]

export default function ComoEstudiar() {
  return (
    <section>
      <h2 className="mb-6 text-3xl font-extrabold">Cómo está organizado cada tema</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {PASOS.map((p, i) => (
          <div key={p.titulo} className="relative overflow-hidden rounded-3xl bg-white p-6 shadow-sm">
            <span className={`absolute -right-4 -top-4 h-20 w-20 rounded-full opacity-15 ${p.color}`} />
            <p className="text-3xl">{p.icono}</p>
            <p className="mt-3 font-bold">{i + 1}. {p.titulo}</p>
            <p className="text-sm text-tinta/60">{p.texto}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
