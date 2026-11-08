// Temas de la categoría "avanzado"

export const AVANZADO = [
  {
    id: 'fetch-apis',
    titulo: 'Pedir datos a una API',
    categoria: 'avanzado',
    nivel: 'intermedio',
    icono: '📡',
    resumen: 'fetch + useEffect con estados de carga, error y reintento.',
    queEs:
      'Para traer datos de un servidor se usa fetch (o axios) dentro de un useEffect. Un componente profesional siempre contempla 3 estados: cargando, error y datos. Además cancela la petición si el componente desaparece (AbortController). En proyectos grandes se usa TanStack Query, que añade caché y reintentos automáticos.',
    paraQue: ['Mostrar usuarios, productos, el tiempo…', 'Conectar tu frontend con tu backend o funciones serverless.'],
    secciones: [
      {
        titulo: 'Con async/await',
        codigo: `function Usuarios() {
  const [usuarios, setUsuarios] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const cargar = async () => {
      try {
        const res = await fetch('https://jsonplaceholder.typicode.com/users')
        if (!res.ok) throw new Error('Error ' + res.status)
        setUsuarios(await res.json())
      } catch (err) {
        setError(err.message)
      } finally {
        setCargando(false)
      }
    }
    cargar()
  }, [])

  if (cargando) return <p>Cargando...</p>
  if (error) return <p>❌ {error}</p>
  return <ul>{usuarios.map((u) => <li key={u.id}>{u.name}</li>)}</ul>
}`,
      },
      {
        titulo: 'Caché sencilla en memoria',
        texto: 'Si los datos ya se pidieron, no se vuelven a pedir al volver a la página.',
        codigo: `const cache = {}   // fuera del componente: sobrevive a los renders

async function obtener(url) {
  if (cache[url]) return cache[url]
  const res = await fetch(url)
  if (!res.ok) throw new Error('Error al pedir datos')
  cache[url] = await res.json()
  return cache[url]
}`,
      },
    ],
    demos: ['FetchDemo'],
    errores: ['Hacer useEffect(async () => ...): el efecto no puede ser async. Crea una función async dentro.', 'No comprobar res.ok: fetch no lanza error con un 404 o 500.'],
    claves: ['cargando · error · datos.', 'res.ok antes de res.json().', 'AbortController en el cleanup.'],
    preguntas: [72, 78],
  },
  {
    id: 'levantar-estado',
    titulo: 'Levantar el estado y composición',
    categoria: 'avanzado',
    nivel: 'intermedio',
    icono: '⬆️',
    resumen: 'Compartir datos entre componentes hermanos subiendo el estado al padre.',
    queEs:
      'Los datos en React fluyen hacia abajo. Si dos hermanos necesitan el mismo dato, el estado se “levanta” (lifting state up) al padre común más cercano. El padre guarda el estado y lo reparte: el valor por props a uno y la función para cambiarlo a otro. Componentes “presentacionales” muestran; “contenedores” gestionan datos.',
    paraQue: ['Filtros que afectan a una lista hermana.', 'Un formulario que alimenta una vista previa.', 'Evitar estados duplicados que se desincronizan.'],
    secciones: [
      {
        titulo: 'Ejemplo',
        codigo: `function App() {
  const [cuenta, setCuenta] = useState(0) // ⬆️ estado en el padre

  return (
    <>
      <Pantalla cuenta={cuenta} />
      <BotonSumar alSumar={() => setCuenta((c) => c + 1)} />
      <BotonReset alReset={() => setCuenta(0)} />
    </>
  )
}

const Pantalla = ({ cuenta }) => <h1>{cuenta}</h1>
const BotonSumar = ({ alSumar }) => <button onClick={alSumar}>+1</button>
const BotonReset = ({ alReset }) => <button onClick={alReset}>Reset</button>`,
      },
    ],
    demos: ['LevantarEstadoDemo'],
    errores: ['Copiar la misma información en el estado de dos hijos.', 'Subir el estado demasiado arriba (todo en App): súbelo solo hasta el padre común.'],
    claves: ['Estado en el padre común.', 'Valor ↓ por props, función ↓ para avisar ↑.', 'Si sube mucho → Context.'],
    preguntas: [3, 35, 65],
  },
  {
    id: 'react-router',
    titulo: 'React Router',
    categoria: 'avanzado',
    nivel: 'intermedio',
    icono: '🧭',
    resumen: 'Varias páginas en una SPA: rutas, enlaces, parámetros y navegación por código.',
    queEs:
      'React Router permite tener varias “páginas” sin recargar el navegador. Asocia cada URL a un componente. Esta web lo usa: /temas, /temas/:id, /preguntas, /variables… Los componentes clave son BrowserRouter, Routes, Route, Link/NavLink y Outlet; y los hooks useParams, useNavigate y useLocation.',
    paraQue: ['Navegar sin recargar (más rápido).', 'URLs compartibles y botón “atrás” funcionando.', 'Layouts compartidos (navbar fijo) con Outlet.'],
    secciones: [
      {
        titulo: 'Configuración',
        codigo: `npm install react-router-dom

// main.jsx
<BrowserRouter><App /></BrowserRouter>

// App.jsx
<Routes>
  <Route element={<Layout />}>              {/* layout común */}
    <Route index element={<Inicio />} />     {/* "/" */}
    <Route path="temas" element={<Temas />} />
    <Route path="temas/:id" element={<Tema />} />  {/* parámetro */}
    <Route path="*" element={<NoEncontrada />} />  {/* 404 */}
  </Route>
</Routes>

// Layout.jsx
<><Navbar /><Outlet /><Footer /></>        {/* Outlet = página actual */}`,
      },
      {
        titulo: 'Enlaces, parámetros y navegar por código',
        codigo: `<Link to="/temas">Temas</Link>                // en lugar de <a href>
<NavLink to="/temas" className={({ isActive }) => isActive ? 'activo' : ''}>

const { id } = useParams()                    // /temas/use-state → "use-state"
const navigate = useNavigate()
navigate('/gracias')                          // tras enviar un formulario
navigate(-1)                                  // atrás
const [params, setParams] = useSearchParams() // ?q=react`,
      },
    ],
    demos: ['RouterDemo'],
    errores: ['Usar <a href> internos: recarga toda la app y pierde el estado.', 'Error 404 al recargar en el servidor: hay que redirigir todo a index.html (ver Despliegue).'],
    claves: ['Routes > Route path element.', 'Link, no <a>.', 'useParams · useNavigate · useLocation.'],
    preguntas: [33, 35, 39],
  },
  {
    id: 'local-storage',
    titulo: 'localStorage y sessionStorage',
    categoria: 'avanzado',
    nivel: 'intermedio',
    icono: '💾',
    resumen: 'Guardar datos en el navegador para que sobrevivan a recargas.',
    queEs:
      'localStorage guarda texto en el navegador de forma permanente (hasta que se borre). sessionStorage hace lo mismo pero se borra al cerrar la pestaña. Solo guardan strings, así que los objetos se convierten con JSON.stringify y se recuperan con JSON.parse. Esta web guarda tu progreso así.',
    paraQue: ['Tareas, carrito, preferencias (tema, idioma).', 'Progreso del usuario sin base de datos.'],
    secciones: [
      {
        titulo: 'Patrón: leer al iniciar, guardar al cambiar',
        codigo: `const [tareas, setTareas] = useState(() => {
  const guardadas = localStorage.getItem('tareas')
  return guardadas ? JSON.parse(guardadas) : []
})

useEffect(() => {
  localStorage.setItem('tareas', JSON.stringify(tareas))
}, [tareas])`,
      },
      {
        titulo: 'localStorage vs sessionStorage',
        codigo: `localStorage    → permanente, compartido entre pestañas
sessionStorage  → solo esta pestaña, se borra al cerrarla
Ambos           → ~5 MB, solo strings, NUNCA datos sensibles (contraseñas, tokens)`,
        lenguaje: 'bash',
      },
    ],
    demos: ['LocalStorageDemo'],
    errores: ['Guardar objetos sin JSON.stringify → se guarda "[object Object]".', 'Leer en un useEffect y guardar en otro sin inicialización perezosa: el primer guardado puede pisar los datos con [].'],
    claves: ['JSON.stringify al guardar, JSON.parse al leer.', 'useState(() => ...) para leer una sola vez.'],
    preguntas: [76, 77],
  },
  {
    id: 'patrones',
    titulo: 'Patrones: HOC, render props y composición',
    categoria: 'avanzado',
    nivel: 'avanzado',
    icono: '🧬',
    resumen: 'Formas de reutilizar comportamiento entre componentes.',
    queEs:
      'Un HOC (Higher Order Component) es una función que recibe un componente y devuelve otro mejorado (con carga, permisos, datos…). Hoy casi siempre se prefiere un custom hook o la composición con children, pero los HOC siguen apareciendo en entrevistas y en código existente.',
    paraQue: ['Añadir comportamiento común (loading, auth) a muchos componentes.', 'Entender código legacy (connect de Redux, withRouter…).'],
    secciones: [
      {
        titulo: 'HOC',
        codigo: `function conCargando(Componente) {
  return function ({ cargando, ...props }) {
    if (cargando) return <Spinner />
    return <Componente {...props} />
  }
}

const ListaConCargando = conCargando(ListaUsuarios)
<ListaConCargando cargando={cargando} usuarios={usuarios} />`,
      },
      {
        titulo: 'Composición (lo preferido hoy)',
        codigo: `function Modal({ abierto, titulo, children, acciones }) {
  if (!abierto) return null
  return (
    <div className="modal">
      <h2>{titulo}</h2>
      {children}
      <footer>{acciones}</footer>
    </div>
  )
}

<Modal abierto titulo="¿Borrar?" acciones={<button>Sí</button>}>
  Esta acción no se puede deshacer
</Modal>`,
      },
    ],
    demos: ['HocDemo'],
    errores: ['Crear el HOC dentro del render: se crea un componente nuevo cada vez.', 'Anidar muchos HOC (“wrapper hell”).'],
    claves: ['HOC = función(Componente) → Componente.', 'Hoy: custom hooks + children.'],
    preguntas: [11, 26, 74],
  },
  {
    id: 'componentes-clase',
    titulo: 'Componentes de clase y ciclo de vida',
    categoria: 'avanzado',
    nivel: 'avanzado',
    icono: '🏛️',
    resumen: 'La forma antigua de React. No la usarás para crear, pero sí la leerás.',
    queEs:
      'Antes de los hooks (2019), el estado solo existía en componentes de clase: extienden React.Component, guardan el estado en this.state, lo cambian con this.setState y reaccionan con métodos de ciclo de vida. Hoy se recomiendan funciones + hooks, pero muchas empresas tienen código así y es pregunta típica de entrevista.',
    paraQue: ['Mantener proyectos antiguos.', 'Responder preguntas de entrevista.', 'Error Boundaries (todavía requieren clase).'],
    secciones: [
      {
        titulo: 'Ciclo de vida',
        codigo: `constructor            → inicializar this.state (llamar a super(props))
render                 → devolver JSX
componentDidMount      → tras el primer pintado (fetch, listeners)
shouldComponentUpdate  → return false para evitar un render
componentDidUpdate     → tras cada actualización
componentWillUnmount   → limpieza
// Obsoletos: componentWillMount, componentWillReceiveProps, componentWillUpdate`,
        lenguaje: 'bash',
      },
    ],
    demos: ['ClaseDemo'],
    errores: ['Olvidar super(props) en el constructor → this no existe.', 'Mutar this.state directamente en lugar de usar setState.'],
    claves: ['Los hooks NO funcionan en clases.', 'PureComponent ≈ memo.'],
    preguntas: [4, 6, 13, 15, 44],
  },
  {
    id: 'estado-global',
    titulo: 'Estado global: Redux, Zustand',
    categoria: 'avanzado',
    nivel: 'avanzado',
    icono: '🏪',
    resumen: 'Cuándo Context no basta: stores globales.',
    queEs:
      'Redux guarda TODO el estado de la app en un único objeto (store). Para cambiarlo se despachan acciones ({ type, payload }) que procesan funciones puras (reducers). Hoy se usa Redux Toolkit, que elimina mucho código repetitivo. Zustand es una alternativa más ligera y muy popular.',
    paraQue: ['Apps grandes con mucho estado compartido.', 'Depurar con Redux DevTools (viajar en el tiempo).'],
    secciones: [
      {
        titulo: 'Redux Toolkit',
        codigo: `// store/carritoSlice.js
const carritoSlice = createSlice({
  name: 'carrito',
  initialState: { items: [] },
  reducers: {
    agregar: (state, action) => { state.items.push(action.payload) }, // Immer permite "mutar"
  },
})
export const { agregar } = carritoSlice.actions

// Componente
const items = useSelector((state) => state.carrito.items)
const dispatch = useDispatch()
dispatch(agregar({ id: 1, nombre: 'Café' }))`,
      },
      {
        titulo: 'Zustand',
        codigo: `const useCarrito = create((set) => ({
  items: [],
  agregar: (p) => set((s) => ({ items: [...s.items, p] })),
}))

const { items, agregar } = useCarrito()`,
      },
    ],
    errores: ['Meter en Redux estado local (un input, un modal): usa useState.'],
    claves: ['Store · acción · reducer · dispatch.', 'Thunk = acciones asíncronas.', 'Empieza con Context; escala a Zustand/Redux si hace falta.'],
    preguntas: [18, 19, 20, 21],
  },
  {
    id: 'rendimiento',
    titulo: 'Rendimiento y buenas prácticas',
    categoria: 'avanzado',
    nivel: 'avanzado',
    icono: '🏎️',
    resumen: 'Code splitting, memo, funciones puras, testing y Next.js.',
    queEs:
      'Una app React rápida y mantenible sigue unas pocas reglas: componentes puros y pequeños, estado lo más cerca posible de donde se usa, cargar código bajo demanda (lazy + Suspense), memorizar solo lo que lo necesita y testear el comportamiento con React Testing Library.',
    paraQue: ['Que la web cargue rápido.', 'Que el código lo entienda otro programador (o tú en 6 meses).'],
    secciones: [
      {
        titulo: 'Lazy loading de páginas',
        codigo: `import { lazy, Suspense } from 'react'
const Admin = lazy(() => import('./pages/Admin'))   // se descarga al visitarla

<Suspense fallback={<p>Cargando...</p>}>
  <Admin />
</Suspense>`,
      },
      {
        titulo: 'Funciones puras',
        texto: 'Un componente debe ser como una función pura: mismas props y estado → mismo JSX, sin efectos durante el render.',
        codigo: `const sumar = (a, b) => a + b        // ✅ pura
const aleatorio = () => Math.random() // ❌ impura (resultado distinto cada vez)

function Mal() {
  contadorGlobal++                     // ❌ modifica algo de fuera al renderizar
  return <p>{contadorGlobal}</p>
}`,
      },
      {
        titulo: 'Testing',
        codigo: `import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

test('el contador suma', async () => {
  render(<Contador />)
  await userEvent.click(screen.getByRole('button', { name: '+1' }))
  expect(screen.getByText('1')).toBeInTheDocument()
})`,
      },
    ],
    errores: ['Optimizar antes de medir (usa React DevTools → Profiler).', 'Componentes de 300 líneas: divide.'],
    claves: ['lazy + Suspense.', 'Componentes puros.', 'Next.js = React + SSR + rutas por archivos.'],
    preguntas: [40, 45, 50, 66],
  },
]
