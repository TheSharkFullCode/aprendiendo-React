// Preguntas de entrevista 67-78 (escenarios prácticos)

export const PREGUNTAS_4 = [
  {
    n: 67,
    categoria: 'Escenarios',
    pregunta: 'Escenario: formulario de contacto que envía datos a una API.',
    respuesta:
      'Campos: nombre, email y mensaje (obligatorios) y un checkbox opcional. Al enviar se hace un POST; si va bien se resetea y se muestra un mensaje de éxito; si falla, un error.',
    codigo: `const INICIAL = { nombre: '', email: '', mensaje: '', acepto: false }

function FormularioContacto() {
  const [form, setForm] = useState(INICIAL)
  const [enviando, setEnviando] = useState(false)
  const [estado, setEstado] = useState('') // 'ok' | 'error'

  const handleChange = (e) => {
    const { name, value, checked } = e.target
    setForm({ ...form, [name]: name === 'acepto' ? checked : value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setEnviando(true)
    try {
      const res = await fetch('https://api.ejemplo.com/contacto', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error()
      setForm(INICIAL)
      setEstado('ok')
    } catch {
      setEstado('error')
    } finally {
      setEnviando(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input name="nombre" value={form.nombre} onChange={handleChange} required />
      <input name="email" type="email" value={form.email} onChange={handleChange} required />
      <textarea name="mensaje" value={form.mensaje} onChange={handleChange} required />
      <input name="acepto" type="checkbox" checked={form.acepto} onChange={handleChange} />
      <button disabled={enviando}>{enviando ? 'Enviando...' : 'Enviar'}</button>
      {estado === 'ok' && <p>¡Mensaje enviado!</p>}
      {estado === 'error' && <p>Error al enviar. Inténtalo de nuevo.</p>}
    </form>
  )
}`,
  },
  {
    n: 68,
    categoria: 'Escenarios',
    pregunta: 'Escenario: lista de tareas con título, descripción, prioridad y tachado al completar.',
    respuesta: 'Se puede añadir, editar, borrar y marcar como completada. Las completadas se tachan.',
    codigo: `function ListaTareas() {
  const [tareas, setTareas] = useState([])
  const [nueva, setNueva] = useState({ titulo: '', descripcion: '', prioridad: 'media' })

  const cambiar = (e) => setNueva({ ...nueva, [e.target.name]: e.target.value })

  const agregar = (e) => {
    e.preventDefault()
    setTareas([...tareas, { ...nueva, id: Date.now(), hecha: false }])
    setNueva({ titulo: '', descripcion: '', prioridad: 'media' })
  }
  const alternar = (id) => setTareas(tareas.map((t) => (t.id === id ? { ...t, hecha: !t.hecha } : t)))
  const editar = (id, titulo) => setTareas(tareas.map((t) => (t.id === id ? { ...t, titulo } : t)))
  const borrar = (id) => setTareas(tareas.filter((t) => t.id !== id))

  return (
    <>
      <form onSubmit={agregar}>
        <input name="titulo" value={nueva.titulo} onChange={cambiar} />
        <input name="descripcion" value={nueva.descripcion} onChange={cambiar} />
        <select name="prioridad" value={nueva.prioridad} onChange={cambiar}>
          <option value="alta">Alta</option>
          <option value="media">Media</option>
          <option value="baja">Baja</option>
        </select>
        <button>Añadir</button>
      </form>
      <ul>
        {tareas.map((t) => (
          <li key={t.id} style={{ textDecoration: t.hecha ? 'line-through' : 'none' }}>
            <input type="checkbox" checked={t.hecha} onChange={() => alternar(t.id)} />
            {t.titulo} ({t.prioridad}) — {t.descripcion}
            <button onClick={() => editar(t.id, prompt('Nuevo título', t.titulo))}>✏️</button>
            <button onClick={() => borrar(t.id)}>🗑️</button>
          </li>
        ))}
      </ul>
    </>
  )
}`,
  },
  {
    n: 69,
    categoria: 'Escenarios',
    pregunta: 'Escenario: formulario de registro con validación.',
    respuesta: 'Nombre obligatorio y solo letras; email obligatorio y con formato válido; contraseña obligatoria y de al menos 8 caracteres.',
    codigo: `function validar({ nombre, email, clave }) {
  const errores = {}
  if (!nombre) errores.nombre = 'El nombre es obligatorio'
  else if (!/^[a-zA-ZáéíóúñÑ ]+$/.test(nombre)) errores.nombre = 'Solo letras'
  if (!email) errores.email = 'El email es obligatorio'
  else if (!/^\\S+@\\S+\\.\\S+$/.test(email)) errores.email = 'Email no válido'
  if (!clave) errores.clave = 'La contraseña es obligatoria'
  else if (clave.length < 8) errores.clave = 'Mínimo 8 caracteres'
  return errores
}

function Registro() {
  const [form, setForm] = useState({ nombre: '', email: '', clave: '' })
  const [errores, setErrores] = useState({})

  const handleSubmit = (e) => {
    e.preventDefault()
    const nuevos = validar(form)
    setErrores(nuevos)
    if (Object.keys(nuevos).length === 0) console.log('Registro OK', form)
  }

  const cambiar = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  return (
    <form onSubmit={handleSubmit}>
      <input name="nombre" value={form.nombre} onChange={cambiar} />
      {errores.nombre && <span>{errores.nombre}</span>}
      <input name="email" value={form.email} onChange={cambiar} />
      {errores.email && <span>{errores.email}</span>}
      <input name="clave" type="password" value={form.clave} onChange={cambiar} />
      {errores.clave && <span>{errores.clave}</span>}
      <button>Registrarme</button>
    </form>
  )
}`,
  },
  {
    n: 70,
    categoria: 'Escenarios',
    pregunta: 'Escenario: input controlado que muestra el valor tras 2 segundos sin escribir.',
    respuesta: 'Es un debounce: cada vez que cambia el input, se programa un setTimeout de 2 s y se cancela el anterior.',
    codigo: `function InputRetrasado() {
  const [valor, setValor] = useState('')
  const [mostrado, setMostrado] = useState('')

  useEffect(() => {
    const id = setTimeout(() => setMostrado(valor), 2000)
    return () => clearTimeout(id) // si escribe antes de 2 s, se reinicia
  }, [valor])

  return (
    <>
      <input value={valor} onChange={(e) => setValor(e.target.value)} />
      <p>Valor mostrado: {mostrado}</p>
    </>
  )
}`,
  },
  {
    n: 71,
    categoria: 'Escenarios',
    pregunta: 'Escenario: renderizar una lista anidada de profundidad desconocida.',
    respuesta: 'Se resuelve con un componente RECURSIVO: se llama a sí mismo con los hijos de cada elemento.',
    codigo: `const datos = [
  { name: 'Item 1', children: [
    { name: 'Subitem 1.1', children: [{ name: 'Sub-subitem 1.1.1', children: [] }] },
  ] },
  { name: 'Item 2', children: [] },
]

function ListaAnidada({ items }) {
  return (
    <ul>
      {items.map((item) => (
        <li key={item.name}>
          {item.name}
          {item.children.length > 0 && <ListaAnidada items={item.children} />}
        </li>
      ))}
    </ul>
  )
}`,
  },
  {
    n: 72,
    categoria: 'Escenarios',
    pregunta: 'Escenario: pedir datos a una API (que tarda 2 s) y mostrarlos en una lista.',
    respuesta: 'useEffect con [] para pedir al montar, un estado de carga mientras espera y el map para pintar.',
    codigo: `function ListaUsuarios() {
  const [usuarios, setUsuarios] = useState([])
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    const cargar = async () => {
      await new Promise((r) => setTimeout(r, 2000)) // simula los 2 s
      const res = await fetch('https://jsonplaceholder.typicode.com/users')
      setUsuarios(await res.json())
      setCargando(false)
    }
    cargar()
  }, [])

  if (cargando) return <p>Cargando...</p>
  return <ul>{usuarios.map((u) => <li key={u.id}>{u.name}</li>)}</ul>
}`,
  },
  {
    n: 73,
    categoria: 'Escenarios',
    pregunta: 'Escenario: botón que pone el foco en un input con useRef.',
    respuesta: 'La ref apunta al input y el botón llama a ref.current.focus().',
    codigo: `function EnfocarInput() {
  const inputRef = useRef(null)
  return (
    <>
      <input ref={inputRef} />
      <button onClick={() => inputRef.current.focus()}>Enfocar</button>
    </>
  )
}`,
  },
  {
    n: 74,
    categoria: 'Conceptos',
    pregunta: '¿Qué es un Higher Order Component? (versión 2)',
    respuesta:
      'Un HOC actúa como “envoltorio” de otros componentes: les añade lógica común manteniéndolos simples y reutilizables. Por ejemplo, conectar varias listas a la misma fuente de datos con suscripción y limpieza.',
    codigo: `function conSuscripcion(Componente, obtenerDatos) {
  return function Envoltorio(props) {
    const [datos, setDatos] = useState(() => obtenerDatos(DataSource))

    useEffect(() => {
      const alCambiar = () => setDatos(obtenerDatos(DataSource))
      DataSource.addChangeListener(alCambiar)
      return () => DataSource.removeChangeListener(alCambiar)
    }, [])

    return <Componente datos={datos} {...props} />
  }
}

const ListaComentarios = conSuscripcion(Comentarios, (ds) => ds.getComments())`,
    nota: 'El original mostraba un componente normal (CommentList), no un HOC. Aquí tienes el HOC real.',
  },
  {
    n: 75,
    categoria: 'Conceptos',
    pregunta: 'Explica el papel de las keys en listas y qué problemas aparecen sin ellas.',
    respuesta:
      'Las keys permiten a React saber qué elementos han cambiado, se han añadido o se han borrado. Sin ellas (o con keys inestables) React puede repintar de más y causar bugs: inputs con el texto de otra fila, animaciones raras o estado mezclado.',
    puntos: ['Únicas: cada elemento con la suya.', 'Estables: no cambian entre renders.', 'Sacadas de los datos: normalmente el id.'],
    codigo: `const ListaTareas = ({ tareas }) => (
  <ul>
    {tareas.map((t) => <li key={t.id}>{t.texto}</li>)}
  </ul>
)`,
  },
  {
    n: 76,
    categoria: 'Escenarios',
    pregunta: 'Escenario: guardar las tareas en localStorage para que no se pierdan.',
    respuesta: 'Se leen al iniciar y se guardan cada vez que cambian.',
    codigo: `const App = () => {
  const [tareas, setTareas] = useState(() => JSON.parse(localStorage.getItem('tareas')) ?? [])

  useEffect(() => {
    localStorage.setItem('tareas', JSON.stringify(tareas))
  }, [tareas])

  const agregar = (t) => setTareas([...tareas, t])
  const borrar = (id) => setTareas(tareas.filter((t) => t.id !== id))

  return <ListaTareas tareas={tareas} agregar={agregar} borrar={borrar} />
}`,
    nota: 'Mejora: el original leía en un useEffect separado, y el efecto de guardado podía sobrescribir los datos con [] al arrancar. Leer en useState(() => ...) lo evita.',
  },
  {
    n: 77,
    categoria: 'Escenarios',
    pregunta: 'Escenario: carrito que se mantiene durante la sesión (sessionStorage).',
    respuesta: 'Igual que con localStorage, pero con sessionStorage: sobrevive a recargas y cambios de página, y se borra al cerrar la pestaña.',
    codigo: `const [carrito, setCarrito] = useState(() => JSON.parse(sessionStorage.getItem('carrito')) ?? [])

useEffect(() => {
  sessionStorage.setItem('carrito', JSON.stringify(carrito))
}, [carrito])

const agregar = (p) => setCarrito([...carrito, p])
const quitar = (id) => setCarrito(carrito.filter((p) => p.id !== id))`,
  },
  {
    n: 78,
    categoria: 'Escenarios',
    pregunta: 'Escenario: pedir usuarios con caché, estado de carga y reintento si falla.',
    respuesta: 'Una caché fuera del componente evita repetir la petición; se muestran “cargando”, error con botón de reintentar o la lista.',
    codigo: `const cache = {}

function ListaUsuarios() {
  const [datos, setDatos] = useState(cache.usuarios || [])
  const [cargando, setCargando] = useState(!cache.usuarios)
  const [error, setError] = useState(null)

  const pedir = async () => {
    if (cache.usuarios) return
    setCargando(true)
    setError(null)
    try {
      const res = await fetch('https://jsonplaceholder.typicode.com/users')
      if (!res.ok) throw new Error('No se pudieron cargar los datos')
      cache.usuarios = await res.json()
      setDatos(cache.usuarios)
    } catch (err) {
      setError(err.message)
    } finally {
      setCargando(false)
    }
  }

  useEffect(() => { pedir() }, [])

  if (cargando) return <p>Cargando...</p>
  if (error) return <p>{error} <button onClick={pedir}>Reintentar</button></p>
  return <ul>{datos.map((u) => <li key={u.id}>{u.name}</li>)}</ul>
}`,
  },
]
