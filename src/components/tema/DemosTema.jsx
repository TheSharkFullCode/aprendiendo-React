import TituloBloque from './TituloBloque'
import DemoConCodigo from './DemoConCodigo'

// Bloque "Pruébalo": demos interactivas del tema
export default function DemosTema({ demos = [] }) {
  if (demos.length === 0) return null

  return (
    <section>
      <TituloBloque icono="🎮" color="bg-esmeralda">Pruébalo en vivo</TituloBloque>
      <p className="mb-4 text-tinta/60">
        Estos ejemplos se están ejecutando de verdad. Pulsa “Ver código” para ver exactamente el archivo que los genera.
      </p>
      <div className="space-y-6">
        {demos.map((nombre) => (
          <DemoConCodigo key={nombre} nombre={nombre} />
        ))}
      </div>
    </section>
  )
}
