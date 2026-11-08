import BloqueCodigo from '../ui/BloqueCodigo'

// Un paso de la guía de despliegue
export default function TarjetaPaso({ paso }) {
  return (
    <section className="grid gap-4 rounded-3xl bg-white p-6 shadow-sm lg:grid-cols-5">
      <div className="lg:col-span-2">
        <span className={`grid h-12 w-12 place-items-center rounded-2xl text-2xl text-white ${paso.color}`}>{paso.icono}</span>
        <h2 className="mt-3 text-xl font-extrabold">{paso.titulo}</h2>
        <p className="mt-2 text-sm leading-relaxed text-tinta/70">{paso.texto}</p>
      </div>
      <div className="lg:col-span-3">
        <BloqueCodigo codigo={paso.comandos} lenguaje="bash" titulo="terminal" />
      </div>
    </section>
  )
}
