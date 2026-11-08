import BloqueCodigo from '../ui/BloqueCodigo'

const EJEMPLO = `// Opción 1: importarlas directamente
import { SITIO, COLORES } from '../config/variables'

// Opción 2 (la que usa esta web): a través del contexto global
import useCuaderno from '../context/useCuaderno'

function Footer() {
  const { variables } = useCuaderno()
  return <p>{variables.SITIO.nombre} v{variables.SITIO.version}</p>
}`

// Explica cómo leer las variables desde cualquier componente
export default function ComoUsarVariables() {
  return (
    <section>
      <h2 className="mb-4 text-2xl font-extrabold">🧩 Cómo usarlas en un componente</h2>
      <BloqueCodigo codigo={EJEMPLO} titulo="ejemplo.jsx" />
    </section>
  )
}
