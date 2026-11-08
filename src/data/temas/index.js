import { FUNDAMENTOS } from './fundamentos'
import { INTERFAZ } from './interfaz'
import { ARRAYS } from './arrays'
import { HOOKS } from './hooks'
import { AVANZADO } from './avanzado'

// Orden recomendado de estudio (ruta de aprendizaje).
// Para añadir un tema: créalo en su archivo y añade su id aquí.
const ORDEN = [
  'que-es-react', 'primer-proyecto', 'jsx', 'componentes', 'props', 'eventos',
  'use-state', 'renderizado-condicional', 'metodos-arrays', 'listas-y-keys',
  'filtrar-y-buscar', 'arrays-en-estado', 'formularios', 'estilos',
  'use-effect', 'fetch-apis', 'use-ref', 'levantar-estado', 'use-context',
  'use-reducer', 'use-memo-callback', 'otros-hooks', 'custom-hooks',
  'react-router', 'local-storage', 'patrones', 'componentes-clase',
  'estado-global', 'rendimiento',
]

const TODOS = [...FUNDAMENTOS, ...INTERFAZ, ...ARRAYS, ...HOOKS, ...AVANZADO]

export const TEMAS = ORDEN.map((id, i) => {
  const tema = TODOS.find((t) => t.id === id)
  if (!tema) throw new Error(`Tema no encontrado: ${id}`)
  return { ...tema, numero: i + 1 }
})
