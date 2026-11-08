import TituloBloque from './TituloBloque'
import BloqueCodigo from '../ui/BloqueCodigo'

// Bloque "¿Cómo se utiliza?": cada sección con explicación + código
export default function SeccionesTema({ secciones }) {
  return (
    <section>
      <TituloBloque icono="🛠️" color="bg-cian">¿Cómo se utiliza?</TituloBloque>
      <div className="space-y-8">
        {secciones.map((s, i) => (
          <div key={s.titulo}>
            <h3 className="mb-2 text-lg font-bold">
              <span className="text-cian">{i + 1}.</span> {s.titulo}
            </h3>
            {s.texto && <p className="mb-3 text-tinta/70">{s.texto}</p>}
            <BloqueCodigo codigo={s.codigo} lenguaje={s.lenguaje ?? 'jsx'} titulo={s.lenguaje ?? 'jsx'} />
          </div>
        ))}
      </div>
    </section>
  )
}
