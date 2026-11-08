import TituloBloque from './TituloBloque'

// Bloque "¿Qué es?" + "¿Para qué sirve?"
export default function TeoriaTema({ tema }) {
  return (
    <section className="grid gap-6 lg:grid-cols-5">
      <div className="lg:col-span-3">
        <TituloBloque icono="🤔">¿Qué es?</TituloBloque>
        <p className="rounded-3xl bg-white p-6 text-lg leading-relaxed shadow-sm">{tema.queEs}</p>
      </div>
      <div className="lg:col-span-2">
        <TituloBloque icono="🎯" color="bg-rosa">¿Para qué sirve?</TituloBloque>
        <ul className="space-y-2">
          {tema.paraQue.map((p) => (
            <li key={p} className="flex gap-2 rounded-2xl bg-rosa/5 p-3 text-sm">
              <span className="text-rosa">✦</span> {p}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
