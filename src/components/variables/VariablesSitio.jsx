import useCuaderno from '../../context/useCuaderno'
import BloqueCodigo from '../ui/BloqueCodigo'

// Valores actuales de SITIO, RUTAS, CATEGORIAS_PREGUNTAS y CLAVE_PROGRESO
export default function VariablesSitio() {
  const { variables } = useCuaderno()
  const { SITIO, RUTAS, CATEGORIAS_PREGUNTAS, CLAVE_PROGRESO } = variables

  const bloques = [
    { nombre: 'SITIO', valor: SITIO },
    { nombre: 'RUTAS', valor: RUTAS },
    { nombre: 'CATEGORIAS_PREGUNTAS', valor: CATEGORIAS_PREGUNTAS },
    { nombre: 'CLAVE_PROGRESO', valor: CLAVE_PROGRESO },
  ]

  return (
    <section>
      <h2 className="mb-4 text-2xl font-extrabold">⚙️ Resto de variables (valor actual)</h2>
      <div className="grid gap-4 lg:grid-cols-2">
        {bloques.map((b) => (
          <BloqueCodigo
            key={b.nombre}
            titulo={b.nombre}
            lenguaje="json"
            codigo={JSON.stringify(b.valor, null, 2)}
          />
        ))}
      </div>
    </section>
  )
}
