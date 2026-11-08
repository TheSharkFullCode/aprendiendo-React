// Temas de "fundamentos" sobre la interfaz: condicionales, formularios y estilos

export const INTERFAZ = [
  {
    id: 'renderizado-condicional',
    titulo: 'Ternarios y renderizado condicional',
    categoria: 'fundamentos',
    nivel: 'basico',
    icono: '🔀',
    resumen: 'Mostrar una cosa u otra según una condición: ?, && y return temprano.',
    queEs:
      'Como dentro de JSX no puedes usar if, React usa operadores de JavaScript que devuelven valores: el ternario (condición ? A : B) para elegir entre dos opciones y el && (condición && A) para mostrar algo solo si se cumple. Fuera del return sí puedes usar if normal.',
    paraQue: ['Mostrar “Cargando…”, errores o datos.', 'Cambiar textos, colores o clases según el estado.', 'Ocultar elementos (menús, modales, avisos).'],
    secciones: [
      {
        titulo: 'Las 4 formas',
        codigo: `function Panel({ usuario, cargando, error, avisos }) {
  // 1) Return temprano con if (fuera del JSX)
  if (cargando) return <p>Cargando...</p>
  if (error) return <p>Error: {error}</p>

  return (
    <div>
      {/* 2) Ternario: A o B */}
      <h1>{usuario ? \`Hola \${usuario.nombre}\` : 'Invitado'}</h1>

      {/* 3) &&: solo si es verdadero */}
      {avisos.length > 0 && <p>Tienes {avisos.length} avisos</p>}

      {/* 4) Ternario en clases */}
      <span className={usuario ? 'text-green-500' : 'text-gray-400'}>●</span>
    </div>
  )
}`,
      },
      {
        titulo: 'Varias opciones: objeto de mapeo',
        texto: 'Cuando hay más de dos casos, un objeto es más limpio que ternarios anidados.',
        codigo: `const ICONOS = { exito: '✅', error: '❌', aviso: '⚠️' }

function Alerta({ tipo, mensaje }) {
  return <p>{ICONOS[tipo] ?? 'ℹ️'} {mensaje}</p>
}`,
      },
    ],
    demos: ['TernarioDemo'],
    errores: [
      'El “0” fantasma: {lista.length && <Lista />} pinta un 0 si está vacía. Usa {lista.length > 0 && ...}.',
      'Anidar 3 ternarios seguidos: ilegible. Usa if fuera o un objeto.',
    ],
    claves: ['? : → una cosa u otra.', '&& → algo o nada.', 'return null → no pintar nada.'],
    preguntas: [13],
  },
  {
    id: 'formularios',
    titulo: 'Formularios controlados',
    categoria: 'fundamentos',
    nivel: 'intermedio',
    icono: '📝',
    resumen: 'Inputs cuyo valor vive en el estado de React, con validación.',
    queEs:
      'Un input controlado es aquel cuyo value viene del estado y que actualiza ese estado en cada onChange. Así React es la “única fuente de verdad”: siempre sabes qué hay escrito y puedes validar, limpiar o transformar el valor al momento.',
    paraQue: ['Validar mientras el usuario escribe.', 'Desactivar el botón de enviar si hay errores.', 'Resetear el formulario tras enviarlo.'],
    secciones: [
      {
        titulo: 'Un input controlado',
        codigo: `const [nombre, setNombre] = useState('')

<input value={nombre} onChange={(e) => setNombre(e.target.value)} />`,
      },
      {
        titulo: 'Muchos campos con un solo estado',
        texto: 'Usa el atributo name y una propiedad dinámica [name] para no escribir un handler por campo.',
        codigo: `const [form, setForm] = useState({ nombre: '', email: '', acepto: false })

const handleChange = (e) => {
  const { name, value, type, checked } = e.target
  setForm({ ...form, [name]: type === 'checkbox' ? checked : value })
}

<input name="nombre" value={form.nombre} onChange={handleChange} />
<input name="email" value={form.email} onChange={handleChange} />
<input name="acepto" type="checkbox" checked={form.acepto} onChange={handleChange} />`,
      },
      {
        titulo: 'Enviar a una API',
        codigo: `const handleSubmit = async (e) => {
  e.preventDefault()
  setEnviando(true)
  try {
    const res = await fetch('/api/contacto', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    if (!res.ok) throw new Error('No se pudo enviar')
    setForm(INICIAL)       // reset
    setMensaje('¡Enviado!')
  } catch (err) {
    setError(err.message)
  } finally {
    setEnviando(false)
  }
}`,
      },
    ],
    demos: ['FormularioDemo'],
    errores: ['Poner value sin onChange: el input queda bloqueado (solo lectura).', 'Mutar el objeto: form.nombre = "x". Siempre { ...form, nombre: "x" }.'],
    claves: ['value + onChange = controlado.', '[name]: value para muchos campos.', 'e.preventDefault() en el submit.'],
    preguntas: [9, 67, 69, 70],
  },
  {
    id: 'estilos',
    titulo: 'Estilos en React',
    categoria: 'fundamentos',
    nivel: 'basico',
    icono: '🎨',
    resumen: 'Tailwind, clases dinámicas, style en línea y CSS-in-JS.',
    queEs:
      'React no impone una forma de dar estilos. Las más usadas son: Tailwind CSS (clases utilitarias, la de esta web), CSS normal o CSS Modules, el atributo style con un objeto JS y librerías CSS-in-JS como styled-components.',
    paraQue: ['Cambiar el aspecto según el estado (activo, error, tema oscuro…).', 'Mantener los estilos junto al componente.'],
    secciones: [
      {
        titulo: 'Clases dinámicas con Tailwind',
        codigo: `function Boton({ activo, children }) {
  return (
    <button
      className={\`rounded-xl px-4 py-2 font-bold \${
        activo ? 'bg-violet-600 text-white' : 'bg-gray-100 text-gray-700'
      }\`}
    >
      {children}
    </button>
  )
}`,
      },
      {
        titulo: 'Tailwind v4: tus propios colores',
        texto: 'En v4 la configuración se hace en el CSS con @theme (sin tailwind.config.js).',
        codigo: `/* src/index.css */
@import "tailwindcss";

@theme {
  --color-primario: #7c3aed;   /* → bg-primario, text-primario... */
  --color-rosa: #ec4899;
}`,
        lenguaje: 'css',
      },
      {
        titulo: 'style en línea y styled-components',
        codigo: `// style: objeto JS, propiedades en camelCase, números = px
<div style={{ backgroundColor: 'tomato', fontSize: 20, padding: '1rem' }} />

// styled-components (librería externa)
import styled from 'styled-components'
const Boton = styled.button\`
  background: \${(props) => (props.$primario ? 'violet' : 'white')};
  border-radius: 8px;
\``,
      },
    ],
    demos: ['EstilosDemo'],
    errores: ['Construir clases Tailwind a trozos: \'bg-\' + color. Tailwind no las detecta; escribe la clase completa.', 'style="color: red" como texto: en React es un objeto.'],
    claves: ['className con template literal para clases dinámicas.', 'style={{ }} = objeto.', 'Clases Tailwind siempre completas.'],
    preguntas: [51, 52],
  },
]
