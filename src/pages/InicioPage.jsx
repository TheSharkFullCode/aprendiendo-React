import Hero from '../components/inicio/Hero'
import Estadisticas from '../components/inicio/Estadisticas'
import RutaAprendizaje from '../components/inicio/RutaAprendizaje'
import ComoEstudiar from '../components/inicio/ComoEstudiar'

// Página de portada
export default function InicioPage() {
  return (
    <div className="space-y-16">
      <Hero />
      <Estadisticas />
      <ComoEstudiar />
      <RutaAprendizaje />
    </div>
  )
}
