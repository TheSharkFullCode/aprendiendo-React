import { Link } from 'react-router-dom'
import useCuaderno from '../../context/useCuaderno'
import Boton from '../ui/Boton'

// Marcar como completado + ir al tema anterior / siguiente
export default function NavegacionTema({ anterior, siguiente, id }) {
  const { completados, toggleCompletado } = useCuaderno()
  const hecho = completados.includes(id)

  const enlace = 'flex-1 rounded-2xl bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md'

  return (
    <footer className="space-y-6 border-t-2 border-dashed border-primario/20 pt-8">
      <div className="text-center">
        <Boton variante={hecho ? 'esmeralda' : 'primario'} onClick={() => toggleCompletado(id)} className="px-8 py-3 text-base">
          {hecho ? '✓ Tema completado (pulsa para desmarcar)' : '🏁 Marcar como completado'}
        </Boton>
      </div>
      <div className="flex flex-col gap-3 sm:flex-row">
        {anterior && (
          <Link to={`/temas/${anterior.id}`} className={enlace}>
            <p className="text-xs font-bold text-tinta/40">← Anterior</p>
            <p className="font-bold">{anterior.icono} {anterior.titulo}</p>
          </Link>
        )}
        {siguiente && (
          <Link to={`/temas/${siguiente.id}`} className={`${enlace} text-right`}>
            <p className="text-xs font-bold text-tinta/40">Siguiente →</p>
            <p className="font-bold">{siguiente.icono} {siguiente.titulo}</p>
          </Link>
        )}
      </div>
    </footer>
  )
}
