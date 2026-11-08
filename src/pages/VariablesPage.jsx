import TituloPagina from '../components/ui/TituloPagina'
import PaletaColores from '../components/variables/PaletaColores'
import TablaCategorias from '../components/variables/TablaCategorias'
import VariablesSitio from '../components/variables/VariablesSitio'
import ComoUsarVariables from '../components/variables/ComoUsarVariables'

// Consulta de todas las variables globales (src/config/variables.js)
export default function VariablesPage() {
  return (
    <>
      <TituloPagina
        antetitulo="src/config/variables.js"
        titulo="Variables del proyecto"
        descripcion="Todo lo configurable de la web en un solo sitio: colores, categorías, menú y datos del sitio. Cambia un valor aquí y se actualiza en toda la web."
      />
      <div className="space-y-12">
        <PaletaColores />
        <TablaCategorias />
        <VariablesSitio />
        <ComoUsarVariables />
      </div>
    </>
  )
}
