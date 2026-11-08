import { NavLink } from 'react-router-dom'
import useCuaderno from '../context/useCuaderno'

// Lista de enlaces del menú. NavLink marca el enlace activo.
export default function EnlacesNav({ vertical = false, alPulsar }) {
  const { variables } = useCuaderno()

  const clases = ({ isActive }) =>
    `flex items-center gap-1.5 rounded-xl px-3 py-2 text-sm font-semibold transition ${
      isActive
        ? 'bg-primario text-white shadow-md shadow-primario/30'
        : 'text-tinta/70 hover:bg-primario/10 hover:text-primario'
    }`

  return (
    <ul className={vertical ? 'flex flex-col gap-1 pt-3' : 'flex items-center gap-1'}>
      {variables.RUTAS.map(({ ruta, texto, icono }) => (
        <li key={ruta}>
          <NavLink to={ruta} end={ruta === '/'} className={clases} onClick={alPulsar}>
            <span>{icono}</span> {texto}
          </NavLink>
        </li>
      ))}
    </ul>
  )
}
