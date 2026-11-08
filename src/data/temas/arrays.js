// Temas de la categoría "arrays": métodos, listas, filtros y arrays en el estado

export const ARRAYS = [
  {
    id: 'metodos-arrays',
    titulo: 'Métodos de arrays para React',
    categoria: 'arrays',
    nivel: 'basico',
    icono: '🧮',
    resumen: 'map, filter, find, some, reduce, spread y desestructuración: el JS que más usarás.',
    queEs:
      'React se apoya muchísimo en JavaScript moderno. Antes de pintar listas necesitas dominar los métodos de array que NO modifican el original y devuelven uno nuevo, porque en React el estado nunca se muta.',
    paraQue: ['Transformar datos en JSX (map).', 'Quitar o buscar elementos (filter, find).', 'Calcular totales (reduce).', 'Copiar y añadir sin mutar (spread ...).'],
    secciones: [
      {
        titulo: 'Los imprescindibles',
        codigo: `const productos = [
  { id: 1, nombre: 'Café', precio: 1.5, stock: true },
  { id: 2, nombre: 'Té', precio: 1.2, stock: false },
  { id: 3, nombre: 'Zumo', precio: 2.5, stock: true },
]

productos.map((p) => p.nombre)              // ['Café', 'Té', 'Zumo']
productos.filter((p) => p.stock)            // Café y Zumo
productos.find((p) => p.id === 2)           // { id: 2, nombre: 'Té', ... }
productos.some((p) => p.precio > 2)         // true
productos.every((p) => p.precio > 1)        // true
productos.reduce((total, p) => total + p.precio, 0)  // 5.2
[...productos].sort((a, b) => a.precio - b.precio)   // copia ordenada`,
      },
      {
        titulo: 'Spread y desestructuración',
        codigo: `// Arrays
const nuevos = [...productos, { id: 4, nombre: 'Agua' }]   // añadir al final
const [primero, segundo, ...resto] = productos

// Objetos
const usuario = { nombre: 'Oscar', edad: 30 }
const actualizado = { ...usuario, edad: 31 }    // copia cambiando edad
const { nombre, ...otros } = usuario`,
      },
      {
        titulo: 'Mutan vs no mutan',
        texto: 'En React usa siempre la columna de la derecha.',
        codigo: `// ❌ MUTAN el original      ✅ DEVUELVEN uno nuevo
push / unshift               [...arr, x] / [x, ...arr]
splice (borrar)              filter
arr[i] = x                   map
sort / reverse               [...arr].sort() / toSorted()`,
        lenguaje: 'bash',
      },
    ],
    errores: ['Olvidar el return en un map con llaves: map((x) => { x * 2 }) devuelve undefined.', 'Usar sort() directamente sobre el estado (lo muta).'],
    claves: ['map transforma, filter quita, find busca uno, reduce acumula.', 'Spread ... para copiar.', 'Nunca mutar el estado.'],
    preguntas: [],
  },
  {
    id: 'listas-y-keys',
    titulo: 'Listas con map y keys',
    categoria: 'arrays',
    nivel: 'basico',
    icono: '📋',
    resumen: 'Pintar arrays en pantalla y por qué cada elemento necesita una key única.',
    queEs:
      'Para pintar una lista conviertes cada elemento del array en JSX con .map(). Cada elemento devuelto necesita una prop key ÚNICA y ESTABLE entre sus hermanos. La key es el “DNI” del elemento: React la usa para saber cuál se añadió, se movió o se borró sin repintar toda la lista.',
    paraQue: ['Mostrar productos, tareas, usuarios, mensajes…', 'Que React actualice listas de forma eficiente y sin bugs.'],
    secciones: [
      {
        titulo: 'map con key',
        codigo: `function ListaUsuarios({ usuarios }) {
  return (
    <ul>
      {usuarios.map((usuario) => (
        <li key={usuario.id}>
          {usuario.nombre} — {usuario.email}
        </li>
      ))}
    </ul>
  )
}`,
      },
      {
        titulo: 'Extraer el elemento a un componente',
        texto: 'La key va en el componente que devuelve el map, no dentro de él.',
        codigo: `function ItemUsuario({ usuario }) {
  return <li>{usuario.nombre}</li>
}

{usuarios.map((u) => <ItemUsuario key={u.id} usuario={u} />)}`,
      },
      {
        titulo: '¿Y el índice como key?',
        texto: 'Solo si la lista es fija (nunca se reordena, filtra ni borra). Si no, al borrar el primero todos los índices cambian y React confunde elementos (inputs con el texto equivocado, checkboxes marcados mal…).',
        codigo: `{tareas.map((t, i) => <li key={i}>{t}</li>)}       // ⚠️ último recurso
{tareas.map((t) => <li key={t.id}>{t.texto}</li>)} // ✅ id estable
// ❌ key={Math.random()} o key={useId()}: cambian en cada render`,
      },
    ],
    demos: ['ListaMapDemo', 'ListaAnidadaDemo'],
    errores: ['Olvidar la key → aviso en consola: “Each child in a list should have a unique key prop”.', 'Keys aleatorias: React recrea todos los elementos en cada render.'],
    claves: ['array.map(x => <El key={x.id} />).', 'key única entre hermanos y estable.', 'Índice solo para listas estáticas.'],
    preguntas: [14, 71, 75],
  },
  {
    id: 'filtrar-y-buscar',
    titulo: 'Filtrar y buscar',
    categoria: 'arrays',
    nivel: 'intermedio',
    icono: '🔎',
    resumen: 'Buscadores y filtros combinando estado, filter y map.',
    queEs:
      'Un buscador en React es simplemente: un estado con el texto, un input controlado y una lista derivada con .filter() antes del .map(). La lista filtrada NO se guarda en otro estado: se calcula en cada render a partir de los datos y del texto (estado derivado).',
    paraQue: ['Buscadores en tiempo real.', 'Filtros por categoría, precio, estado…', 'Contadores de resultados.'],
    secciones: [
      {
        titulo: 'Buscador básico',
        codigo: `function Buscador({ productos }) {
  const [texto, setTexto] = useState('')

  // Estado DERIVADO: se calcula, no se guarda
  const filtrados = productos.filter((p) =>
    p.nombre.toLowerCase().includes(texto.toLowerCase())
  )

  return (
    <>
      <input value={texto} onChange={(e) => setTexto(e.target.value)} />
      <p>{filtrados.length} resultados</p>
      <ul>
        {filtrados.map((p) => <li key={p.id}>{p.nombre}</li>)}
      </ul>
      {filtrados.length === 0 && <p>Sin resultados</p>}
    </>
  )
}`,
      },
      {
        titulo: 'Encadenar filtros',
        codigo: `const visibles = productos
  .filter((p) => categoria === 'todas' || p.categoria === categoria)
  .filter((p) => p.precio <= precioMax)
  .filter((p) => p.nombre.toLowerCase().includes(texto.toLowerCase()))
  .toSorted((a, b) => a.precio - b.precio)`,
      },
    ],
    demos: ['FilterDemo'],
    errores: ['Guardar la lista filtrada en otro useState y sincronizarla con useEffect: innecesario y propenso a errores.', 'Filtrar sin normalizar mayúsculas (toLowerCase).'],
    claves: ['texto en el estado + filter + map.', 'Lo que se puede calcular, no se guarda.'],
    preguntas: [27],
  },
  {
    id: 'arrays-en-estado',
    titulo: 'Arrays en el estado (CRUD)',
    categoria: 'arrays',
    nivel: 'intermedio',
    icono: '🗂️',
    resumen: 'Crear, leer, actualizar y borrar elementos sin mutar el array.',
    queEs:
      'CRUD = Create, Read, Update, Delete. Con arrays en el estado, cada operación crea un ARRAY NUEVO: spread para añadir, map para editar y filter para borrar. React compara referencias: si mutas el mismo array, cree que nada ha cambiado y no repinta.',
    paraQue: ['Listas de tareas, carritos, comentarios…', 'Cualquier lista que el usuario modifica.'],
    secciones: [
      {
        titulo: 'Las 4 operaciones',
        codigo: `const [tareas, setTareas] = useState([])

// CREATE
const crear = (texto) =>
  setTareas([...tareas, { id: crypto.randomUUID(), texto, hecha: false }])

// UPDATE (editar una)
const alternar = (id) =>
  setTareas(tareas.map((t) => (t.id === id ? { ...t, hecha: !t.hecha } : t)))

// DELETE
const borrar = (id) => setTareas(tareas.filter((t) => t.id !== id))

// READ
tareas.map((t) => <Tarea key={t.id} tarea={t} />)`,
      },
      {
        titulo: '❌ Lo que NO debes hacer',
        codigo: `tareas.push(nueva)        // muta → React no se entera
setTareas(tareas)

tareas[0].hecha = true    // muta el objeto
tareas.splice(i, 1)       // muta el array`,
      },
    ],
    demos: ['TareasDemo'],
    errores: ['push/splice sobre el estado.', 'Usar el índice como id: al borrar, los ids cambian.'],
    claves: ['Añadir: [...arr, nuevo].', 'Editar: arr.map(...).', 'Borrar: arr.filter(...).'],
    preguntas: [41, 68],
  },
]
