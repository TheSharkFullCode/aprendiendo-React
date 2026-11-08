import TarjetaTema from './TarjetaTema'

// Rejilla de tarjetas (o mensaje si no hay resultados)
export default function GridTemas({ temas }) {
  if (temas.length === 0) {
    return <p className="rounded-3xl bg-white p-10 text-center text-lg text-tinta/60">😢 No hay temas que coincidan con tu búsqueda.</p>
  }

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {temas.map((tema, i) => (
        <TarjetaTema key={tema.id} tema={tema} retraso={i * 40} />
      ))}
    </div>
  )
}
