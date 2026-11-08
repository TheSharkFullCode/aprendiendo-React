import TituloBloque from './TituloBloque'
import Nota from '../ui/Nota'

// Errores comunes + claves para recordar
export default function ResumenTema({ errores = [], claves = [] }) {
  return (
    <section className="grid gap-6 md:grid-cols-2">
      <div>
        <TituloBloque icono="⚠️" color="bg-rosa">Errores comunes</TituloBloque>
        <div className="space-y-3">
          {errores.map((e) => (
            <Nota key={e} tipo="error">{e}</Nota>
          ))}
        </div>
      </div>
      <div>
        <TituloBloque icono="🧠" color="bg-ambar">Para recordar</TituloBloque>
        <ul className="space-y-2 rounded-3xl bg-ambar/10 p-5">
          {claves.map((c) => (
            <li key={c} className="flex gap-2 font-medium">
              <span>📌</span> {c}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
