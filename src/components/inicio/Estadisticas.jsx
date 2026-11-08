import useCuaderno from '../../context/useCuaderno'

// Contadores de la portada (todo calculado desde el contexto)
export default function Estadisticas() {
  const { temas, preguntas, completados, progreso } = useCuaderno()
  const demos = temas.reduce((total, t) => total + (t.demos?.length ?? 0), 0)

  const datos = [
    { valor: temas.length, texto: 'temas', color: 'text-primario' },
    { valor: demos, texto: 'demos en vivo', color: 'text-rosa' },
    { valor: preguntas.length, texto: 'preguntas de entrevista', color: 'text-cian' },
    { valor: `${completados.length} · ${progreso}%`, texto: 'tu progreso', color: 'text-esmeralda' },
  ]

  return (
    <section className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {datos.map((d) => (
        <div key={d.texto} className="rounded-3xl border border-tinta/5 bg-white p-6 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
          <p className={`text-4xl font-extrabold ${d.color}`}>{d.valor}</p>
          <p className="mt-1 text-sm font-medium text-tinta/60">{d.texto}</p>
        </div>
      ))}
    </section>
  )
}
