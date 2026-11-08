// ============================================================
//  VARIABLES GLOBALES DEL CUADERNO
//  Todo lo configurable de la web vive aquí. Se muestra en la
//  página /variables y se usa en Navbar, Footer, tarjetas, etc.
//  Los colores HEX coinciden con los tokens de src/index.css.
// ============================================================

export const SITIO = {
  nombre: 'Cuaderno React',
  lema: 'Aprende React paso a paso, con teoría, código y ejemplos que puedes tocar.',
  autor: 'TheSharkFullCode',
  github: 'https://github.com/TheSharkFullCode',
  repoPreguntas: 'https://github.com/TheSharkFullCode/ReactJs-Interview-Question',
  version: '1.0.0',
  stack: ['React 19', 'Vite', 'Tailwind CSS v4', 'React Router 7'],
}

// Paleta de colores vivos (fondo blanco)
export const COLORES = [
  { nombre: 'primario', hex: '#7c3aed', uso: 'Botones, enlaces, títulos', clase: 'bg-primario' },
  { nombre: 'rosa', hex: '#ec4899', uso: 'Hooks y degradados', clase: 'bg-rosa' },
  { nombre: 'cian', hex: '#06b6d4', uso: 'Arrays y listas', clase: 'bg-cian' },
  { nombre: 'esmeralda', hex: '#10b981', uso: 'Avanzado y éxito', clase: 'bg-esmeralda' },
  { nombre: 'ambar', hex: '#f59e0b', uso: 'Notas y avisos', clase: 'bg-ambar' },
  { nombre: 'naranja', hex: '#f97316', uso: 'Entrevistas', clase: 'bg-naranja' },
  { nombre: 'tinta', hex: '#1e1b4b', uso: 'Texto principal y código', clase: 'bg-tinta' },
  { nombre: 'papel', hex: '#ffffff', uso: 'Fondo del cuaderno', clase: 'bg-papel' },
]

// Categorías de temas: cada una con su color (clases completas para Tailwind)
export const CATEGORIAS = {
  fundamentos: { nombre: 'Fundamentos', icono: '🧱', texto: 'text-primario', fondo: 'bg-primario', suave: 'bg-primario/10', borde: 'border-primario' },
  arrays: { nombre: 'Arrays y listas', icono: '📋', texto: 'text-cian', fondo: 'bg-cian', suave: 'bg-cian/10', borde: 'border-cian' },
  hooks: { nombre: 'Hooks', icono: '🪝', texto: 'text-rosa', fondo: 'bg-rosa', suave: 'bg-rosa/10', borde: 'border-rosa' },
  avanzado: { nombre: 'Avanzado', icono: '🚀', texto: 'text-esmeralda', fondo: 'bg-esmeralda', suave: 'bg-esmeralda/10', borde: 'border-esmeralda' },
}

// Categorías de las preguntas de entrevista
export const CATEGORIAS_PREGUNTAS = ['Todas', 'Conceptos', 'Hooks', 'Redux', 'Código', 'Adivina la salida', 'Escenarios']

// Menú principal (Navbar)
export const RUTAS = [
  { ruta: '/', texto: 'Inicio', icono: '🏠' },
  { ruta: '/temas', texto: 'Temas', icono: '📚' },
  { ruta: '/preguntas', texto: 'Entrevista', icono: '🎤' },
  { ruta: '/variables', texto: 'Variables', icono: '🎨' },
  { ruta: '/despliegue', texto: 'Despliegue', icono: '🌐' },
]

// Niveles de dificultad de cada tema
export const NIVELES = {
  basico: { texto: 'Básico', clase: 'bg-esmeralda/15 text-esmeralda' },
  intermedio: { texto: 'Intermedio', clase: 'bg-ambar/15 text-ambar' },
  avanzado: { texto: 'Avanzado', clase: 'bg-rosa/15 text-rosa' },
}

// Clave usada en localStorage para guardar el progreso
export const CLAVE_PROGRESO = 'cuaderno-react:completados'
