import { createContext, useMemo, useState } from 'react'
import { TEMAS } from '../data/temas'
import { PREGUNTAS } from '../data/preguntas'
import * as VARIABLES from '../config/variables'
import useLocalStorage from '../hooks/useLocalStorage'

// Contexto global: datos, variables, búsqueda y progreso del cuaderno
export const CuadernoContext = createContext(null)

export function CuadernoProvider({ children }) {
  const [busqueda, setBusqueda] = useState('')
  const [completados, setCompletados] = useLocalStorage(VARIABLES.CLAVE_PROGRESO, [])

  const toggleCompletado = (id) =>
    setCompletados((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    )

  const progreso = Math.round((completados.length / TEMAS.length) * 100)

  const valor = useMemo(
    () => ({
      temas: TEMAS,
      preguntas: PREGUNTAS,
      variables: VARIABLES,
      busqueda,
      setBusqueda,
      completados,
      toggleCompletado,
      progreso,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [busqueda, completados, progreso]
  )

  return <CuadernoContext.Provider value={valor}>{children}</CuadernoContext.Provider>
}
