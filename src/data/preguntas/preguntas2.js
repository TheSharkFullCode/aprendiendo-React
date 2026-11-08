// Preguntas de entrevista 22-41

export const PREGUNTAS_2 = [
  {
    n: 22,
    categoria: 'Hooks',
    pregunta: 'Escribe un custom hook para hacer “debounce” de lo que escribe el usuario.',
    respuesta: 'Debounce = esperar a que el usuario deje de escribir un tiempo antes de usar el valor (por ejemplo, antes de buscar en una API).',
    codigo: `const useDebounce = (valor, espera) => {
  const [valorRetrasado, setValorRetrasado] = useState(valor)

  useEffect(() => {
    const timeout = setTimeout(() => setValorRetrasado(valor), espera)
    return () => clearTimeout(timeout) // si cambia antes, se cancela
  }, [valor, espera])

  return valorRetrasado
}

// Uso
const [valor, setValor] = useState(0)
const ultimo = useDebounce(valor, 1000)
<p>Actual: {valor} | Con debounce: {ultimo}</p>`,
    nota: 'El original olvidaba "espera" en las dependencias; aquí está corregido.',
  },
  {
    n: 23,
    categoria: 'Hooks',
    pregunta: 'Escribe un custom hook para copiar texto al portapapeles.',
    respuesta: 'Usa la API navigator.clipboard y un estado para mostrar “¡Copiado!” durante un momento.',
    codigo: `function useCopiar(contenido) {
  const [copiado, setCopiado] = useState(false)

  const copiar = useCallback(() => {
    navigator.clipboard
      .writeText(contenido)
      .then(() => setCopiado(true))
      .then(() => setTimeout(() => setCopiado(false), 1250))
      .catch((err) => alert(err))
  }, [contenido])

  return [copiado, copiar]
}

// Uso
const [copiado, copiar] = useCopiar('¡Texto a copiar!')
<button onClick={copiar}>{copiado ? '¡Copiado!' : 'Copiar'}</button>`,
  },
  {
    n: 24,
    categoria: 'Hooks',
    pregunta: '¿Cómo se usa useId para generar ids únicos?',
    respuesta: 'useId no recibe parámetros y devuelve un id único y estable para ese componente. Ideal para conectar <label htmlFor> con <input id>.',
    codigo: `const id = useId()
<label htmlFor={\`email-\${id}\`}>Email</label>
<input id={\`email-\${id}\`} type="text" />

// 🔴 Mala práctica: NO usarlo como key de listas
posts.map((post) => <article key={id}>...</article>)`,
  },
  {
    n: 25,
    categoria: 'Conceptos',
    pregunta: '¿Cómo se validan las props en React?',
    respuesta: 'Tradicionalmente con el paquete prop-types (hasta React 15.5 venía incluido en React).',
    codigo: `import PropTypes from 'prop-types'

function MiComponente({ nombre }) {
  return <div>Hola, {nombre}</div>
}

MiComponente.propTypes = { nombre: PropTypes.string }`,
    nota: '⚠️ Actualización: React 19 ya no comprueba propTypes (las ignora). Hoy lo profesional es usar TypeScript para tipar las props.',
  },
  {
    n: 26,
    categoria: 'Código',
    pregunta: 'Da un ejemplo práctico de HOC.',
    respuesta: 'Mostrar un mensaje de carga mientras un componente espera datos:',
    codigo: `function WithLoading(Componente) {
  return function ({ isLoading, ...props }) {
    if (!isLoading) return <Componente {...props} />
    return <p>Espera, estamos cargando tus datos...</p>
  }
}

const ListaConCarga = WithLoading(ListaUsuarios)

const App = () => {
  const [loading, setLoading] = useState(true)
  const [users, setUsers] = useState([])
  useEffect(() => {
    setUsers(['dato de la API', 'otro dato'])
    setLoading(false)
  }, [])
  return <ListaConCarga isLoading={loading} users={users} />
}`,
  },
  {
    n: 27,
    categoria: 'Hooks',
    pregunta: '¿Por qué es útil useDeferredValue?',
    respuesta:
      'Permite “retrasar” la actualización de una parte de la interfaz. El input se actualiza al instante y la parte costosa (por ejemplo, una lista enorme) se actualiza cuando React tiene tiempo. Es parecido al debounce pero con menos código y sin un tiempo fijo.',
    codigo: `const [busqueda, setBusqueda] = useState('')
const busquedaDiferida = useDeferredValue(busqueda)

<input value={busqueda} onChange={(e) => setBusqueda(e.target.value)} />
<ListaUsuarios texto={busquedaDiferida} />`,
  },
  {
    n: 29,
    categoria: 'Código',
    pregunta: '¿Cómo detectar un clic fuera de un componente?',
    respuesta: 'Con una ref al elemento y un listener en document que comprueba si el clic fue dentro (contains) o fuera. (El repositorio original salta de la 27 a la 29: no existe la 28.)',
    codigo: `export default function DetectarFuera() {
  const cajaRef = useRef(null)

  useEffect(() => {
    const clicFuera = (e) => {
      if (!cajaRef.current?.contains(e.target)) alert('¡Has hecho clic fuera!')
    }
    document.addEventListener('mousedown', clicFuera)
    return () => document.removeEventListener('mousedown', clicFuera)
  }, [])

  return <div ref={cajaRef}>¿Me has pulsado?</div>
}`,
    nota: 'El original usaba "ref" en vez de "clickMeDivRef" (daba error). Aquí está corregido.',
  },
  {
    n: 30,
    categoria: 'Conceptos',
    pregunta: '¿Por qué los nombres de componentes empiezan por mayúscula?',
    respuesta: 'En JSX, las etiquetas en minúscula se tratan como HTML. Las que empiezan por mayúscula, como componentes.',
    codigo: `<persona />          // → React.createElement('persona')  (etiqueta HTML, ❌)
<Persona />          // → React.createElement(Persona)    (tu componente, ✅)
<obj.persona />      // → React.createElement(obj.persona) (también válido)`,
  },
  {
    n: 31,
    categoria: 'Conceptos',
    pregunta: '¿Qué diferencia hay entre npm y npx?',
    respuesta:
      'npm es el gestor de paquetes: instala paquetes de Node. npx EJECUTA paquetes: si no lo tienes instalado, lo descarga temporalmente y lo ejecuta. Úsalo para herramientas que solo ejecutas una vez, como crear un proyecto.',
    codigo: `npM → Manager (instalar)   npm install react-router-dom
npX → eXecute (ejecutar)   npx serve dist`,
  },
  {
    n: 32,
    categoria: 'Código',
    pregunta: '¿Cómo poner el foco en un input al cargar el componente?',
    respuesta: 'useRef para apuntar al input y useEffect con [] para hacer focus() al montar.',
    codigo: `const Buscador = () => {
  const inputRef = useRef(null)
  useEffect(() => {
    inputRef.current.focus()
  }, [])
  return <input ref={inputRef} type="text" />
}`,
    nota: 'Para casos simples también existe el atributo autoFocus.',
  },
  {
    n: 33,
    categoria: 'Código',
    pregunta: '¿Cómo navegar desde código con la última versión de React Router?',
    respuesta: 'En v5 se usaba useHistory. Desde v6 se usa useNavigate (o redirect dentro de loaders).',
    codigo: `// v5 (antiguo)
const history = useHistory()
history.push('/ruta')

// v6+ (actual)
const navigate = useNavigate()
async function handleSubmit(e) {
  e.preventDefault()
  await enviarFormulario(e.target)
  navigate('/exito', { replace: true })
}`,
  },
  {
    n: 34,
    categoria: 'Adivina la salida',
    pregunta: '¿Qué es el “batching” de estado? Adivina qué muestra al pulsar +3.',
    respuesta:
      'Muestra 1, no 3. React agrupa (batching) las actualizaciones de un mismo evento en un solo render, y en ese render “number” vale 0 en las tres llamadas: 0 + 1 = 1 tres veces. Para sumar 3 de verdad, pasa una función que recibe el valor más reciente.',
    codigo: `<button onClick={() => {
  setNumber(number + 1)  // 0 + 1
  setNumber(number + 1)  // 0 + 1
  setNumber(number + 1)  // 0 + 1  → resultado: 1
}}>+3</button>

// ✅ Solución
setNumber((n) => n + 1)
setNumber((n) => n + 1)
setNumber((n) => n + 1) // → resultado: 3`,
  },
  {
    n: 35,
    categoria: 'Código',
    pregunta: '¿Cómo pasar datos entre componentes hermanos con React Router?',
    respuesta: 'Metiendo el dato en la URL: un componente navega a /usuario/7 y el otro lo lee con useParams.',
    codigo: `<Route path="/usuario/:id" element={<Usuario />} />

const Usuario = () => {
  const { id } = useParams()
  useEffect(() => {
    console.log(\`/usuario/\${id}\`)
  }, [id])
}`,
    nota: 'Otras opciones: levantar el estado al padre común o usar Context.',
  },
  {
    n: 36,
    categoria: 'Hooks',
    pregunta: '¿Cómo acceder a una variable global con useContext?',
    respuesta: 'Tres pasos: crear el contexto, envolver con el Provider (dándole el valor) y leerlo con useContext en cualquier hijo.',
    codigo: `// 1. Crear
const IdiomaContext = React.createContext(null)

// 2. Proveer
const App = () => (
  <IdiomaContext.Provider value={{ idioma: 'ES' }}>
    <Hijo />
  </IdiomaContext.Provider>
)

// 3. Usar
const Hijo = () => {
  const { idioma } = React.useContext(IdiomaContext)
  return <div>Idioma: {idioma}</div>
}`,
  },
  {
    n: 37,
    categoria: 'Hooks',
    pregunta: '¿Qué diferencia hay entre useMemo y useCallback?',
    respuesta: '',
    puntos: [
      'Los dos reciben una función y un array de dependencias.',
      'useMemo EJECUTA la función y recuerda el RESULTADO (un valor).',
      'useCallback NO la ejecuta: recuerda la FUNCIÓN para llamarla después.',
      'Ambos mantienen la misma referencia entre renders mientras no cambien las dependencias.',
    ],
    codigo: `const total = useMemo(() => calcularTotal(items), [items])   // valor
const guardar = useCallback(() => enviar(items), [items])     // función`,
  },
  {
    n: 38,
    categoria: 'Conceptos',
    pregunta: '¿Por qué preferir Vite antes que Create React App?',
    respuesta: '',
    puntos: [
      'CRA era lento al arrancar y al compilar cuando el proyecto crecía.',
      'Vite no compila toda la app antes de servirla: sirve los módulos bajo demanda usando ES modules nativos.',
      'Recarga en caliente (HMR) casi instantánea.',
      'Soporta TypeScript, JSX e imports dinámicos sin configurar nada.',
      '"npm run build" genera archivos optimizados para producción.',
    ],
    nota: 'Actualización: Create React App está oficialmente obsoleto desde febrero de 2025.',
  },
  {
    n: 39,
    categoria: 'Conceptos',
    pregunta: '¿Qué ventajas tiene react-router?',
    respuesta: '',
    puntos: [
      'Cambias de página sin recargar el navegador.',
      'Funciona el historial (atrás/adelante) del navegador.',
      'Mejor experiencia: transiciones y animaciones entre páginas.',
      'Rutas dinámicas sin pantallazos en blanco.',
      'Piezas principales: BrowserRouter, Routes, Route y Link.',
    ],
  },
  {
    n: 40,
    categoria: 'Conceptos',
    pregunta: '¿Cómo optimizar el rendimiento de una app React?',
    respuesta: '',
    puntos: [
      'En clases: shouldComponentUpdate o PureComponent para evitar renders.',
      'En funciones: React.memo, useMemo y useCallback.',
      'Code splitting con lazy() y Suspense.',
      'Keys estables en listas y estado lo más local posible.',
      'Virtualizar listas muy largas (react-window).',
      'Activar el React Compiler, que memoriza automáticamente.',
    ],
  },
  {
    n: 41,
    categoria: 'Código',
    pregunta: 'Escribe un CRUD en React.',
    respuesta: 'useState guarda los elementos y useEffect los carga de la API. Crear, editar y borrar generan siempre un array nuevo.',
    codigo: `function App() {
  const [items, setItems] = useState([])

  useEffect(() => {
    fetch('https://mi-api.com/items')
      .then((r) => r.json())
      .then(setItems)
  }, [])

  const agregar = (nombre) => setItems([...items, { id: Date.now(), nombre }])
  const editar = (id, nombre) => setItems(items.map((i) => (i.id === id ? { ...i, nombre } : i)))
  const borrar = (id) => setItems(items.filter((i) => i.id !== id))

  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>
          {item.nombre}
          <button onClick={() => editar(item.id, 'Editado')}>Editar</button>
          <button onClick={() => borrar(item.id)}>Borrar</button>
        </li>
      ))}
      <button onClick={() => agregar('Nuevo')}>Añadir</button>
    </ul>
  )
}`,
    nota: 'Mejora respecto al original: usa id en vez del índice (key y edición más seguras).',
  },
]
