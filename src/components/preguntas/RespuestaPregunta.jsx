import BloqueCodigo from '../ui/BloqueCodigo'
import Nota from '../ui/Nota'

// Contenido desplegado: respuesta, puntos, código y nota
export default function RespuestaPregunta({ pregunta }) {
  const { respuesta, puntos, codigo, nota } = pregunta

  return (
    <div className="animate-aparecer space-y-4 border-t border-tinta/5 px-5 pb-6 pt-4 sm:pl-19">
      {respuesta && <p className="leading-relaxed text-tinta/80">{respuesta}</p>}
      {puntos && (
        <ul className="space-y-2">
          {puntos.map((p) => (
            <li key={p} className="flex gap-2">
              <span className="text-naranja">▸</span> {p}
            </li>
          ))}
        </ul>
      )}
      {codigo && <BloqueCodigo codigo={codigo} />}
      {nota && <Nota tipo="consejo">{nota}</Nota>}
    </div>
  )
}
