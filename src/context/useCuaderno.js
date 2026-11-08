import { useContext } from 'react'
import { CuadernoContext } from './CuadernoContext'

// Hook de acceso al contexto: const { temas, progreso } = useCuaderno()
export default function useCuaderno() {
  const contexto = useContext(CuadernoContext)
  if (!contexto) throw new Error('useCuaderno debe usarse dentro de <CuadernoProvider>')
  return contexto
}
