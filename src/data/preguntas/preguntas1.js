// Preguntas de entrevista 1-21 (traducidas y explicadas de forma sencilla)
// Formato: { n, categoria, pregunta, respuesta, puntos?, codigo?, nota? }

export const PREGUNTAS_1 = [
  {
    n: 1,
    categoria: 'Conceptos',
    pregunta: '¿Cómo funciona React?',
    respuesta:
      'React crea un Virtual DOM (una copia ligera del DOM en memoria). Cuando cambia el estado de un componente, primero compara el Virtual DOM nuevo con el anterior para ver qué ha cambiado (“diffing”). Después aplica en el DOM real solo esos cambios (“reconciliación”).',
    nota: 'En pocas palabras: cambias datos → React calcula la diferencia → toca solo lo necesario.',
  },
  {
    n: 2,
    categoria: 'Conceptos',
    pregunta: '¿Qué ventajas tiene usar React?',
    respuesta: 'Las principales ventajas:',
    puntos: [
      'Es fácil saber cómo se pinta un componente: solo miras lo que devuelve.',
      'JSX hace el código legible: ves la estructura y cómo se combinan los componentes.',
      'Se puede renderizar en el servidor (SSR, por ejemplo con Next.js), lo que mejora el SEO y la velocidad.',
      'Es fácil de testear.',
      'Es solo la capa de vista, así que se combina con cualquier otra herramienta.',
    ],
  },
  {
    n: 3,
    categoria: 'Conceptos',
    pregunta: '¿Qué diferencia hay entre un componente presentacional y uno contenedor?',
    respuesta:
      'Los presentacionales se ocupan de CÓMO se ven las cosas: reciben datos y funciones por props y los muestran. Rara vez tienen estado (y si lo tienen es de interfaz, como “abierto/cerrado”). Los contenedores se ocupan de CÓMO funcionan las cosas: obtienen los datos, tienen estado y pasan datos y funciones a los presentacionales.',
    nota: 'Hoy este patrón se consigue a menudo con custom hooks: el hook es el “contenedor” y el componente el “presentacional”.',
  },
  {
    n: 4,
    categoria: 'Conceptos',
    pregunta: '¿Qué diferencias hay entre un componente de clase y uno funcional?',
    respuesta:
      'El de clase usa la sintaxis class de ES6, extiende React.Component y tiene un método render() que devuelve JSX. El funcional es una función normal que devuelve JSX. Antes de los hooks, los funcionales no podían tener estado; ahora, con hooks, pueden hacer todo y son la forma recomendada.',
    codigo: `// Clase
class Saludo extends React.Component {
  render() { return <h1>Hola {this.props.nombre}</h1> }
}

// Función (recomendado)
function Saludo({ nombre }) {
  return <h1>Hola {nombre}</h1>
}`,
  },
  {
    n: 5,
    categoria: 'Conceptos',
    pregunta: '¿Qué diferencia hay entre state y props?',
    respuesta:
      'El state (estado) son los datos PROPIOS del componente: empiezan con un valor inicial y cambian con el tiempo, normalmente por acciones del usuario. Las props son la configuración que el componente recibe desde ARRIBA (su padre) y son de solo lectura: el componente no puede cambiarlas, aunque sí decide qué props pasa a sus hijos. También se pueden pasar funciones como props.',
    nota: 'Truco: props = argumentos de una función · state = variables internas que React recuerda.',
  },
  {
    n: 6,
    categoria: 'Conceptos',
    pregunta: '¿Cuáles son los métodos de ciclo de vida?',
    respuesta: 'Solo existen en componentes de clase:',
    puntos: [
      'componentWillMount (obsoleto): configuración inicial.',
      'componentDidMount: tras el primer pintado. Aquí se piden datos y se ponen listeners.',
      'componentWillReceiveProps (obsoleto): reaccionaba a cambios de props.',
      'shouldComponentUpdate: devuelve true/false para decidir si repintar. Sirve para optimizar.',
      'componentWillUpdate (obsoleto): se usaba poco.',
      'componentDidUpdate: tras cada actualización; para tocar el DOM según props/estado.',
      'componentWillUnmount: antes de desaparecer; cancelar peticiones y quitar listeners.',
    ],
    nota: 'Con hooks: useEffect con [] = componentDidMount; con [dep] = componentDidUpdate; su return = componentWillUnmount.',
  },
  {
    n: 7,
    categoria: 'Hooks',
    pregunta: 'Explica los Hooks de React.',
    respuesta:
      'Los hooks permiten usar estado y otras funciones de React sin escribir clases. El primero que encontrarás es useState, que añade estado a un componente funcional y devuelve un array con el valor y una función para cambiarlo. El segundo es useEffect, que ejecuta efectos secundarios: con [] equivale a componentDidMount y con [valor] se ejecuta cuando ese valor cambia.',
    codigo: `// Hook
const [count, setCount] = useState(0)
<button onClick={() => setCount(count + 1)}>Sumar</button>

// Equivalente en clase
this.state = { count: 0 }
<button onClick={() => this.setState({ count: this.state.count + 1 })}>Sumar</button>

useEffect(() => {
  // se ejecuta al montar el componente
}, [])`,
  },
  {
    n: 8,
    categoria: 'Conceptos',
    pregunta: '¿Dónde se hace una petición AJAX/API en un componente de clase?',
    respuesta:
      'En componentDidMount. Se ejecuta una sola vez, cuando el componente ya está en el DOM, así que cuando llegue la respuesta habrá un componente al que hacer setState. En componentes funcionales, el equivalente es useEffect con [].',
  },
  {
    n: 9,
    categoria: 'Conceptos',
    pregunta: '¿Qué son los componentes controlados?',
    respuesta:
      'En HTML normal, los inputs guardan su propio valor. En React, el componente guarda el valor del input en su estado y lo actualiza en cada onChange, repintando el componente. Un input cuyo valor controla React de esta forma se llama componente controlado.',
    codigo: `const [email, setEmail] = useState('')
<input value={email} onChange={(e) => setEmail(e.target.value)} />`,
  },
  {
    n: 10,
    categoria: 'Conceptos',
    pregunta: '¿Para qué sirven las refs?',
    respuesta:
      'Para obtener una referencia directa a un elemento del DOM (o a una instancia). Casos típicos: gestionar el foco o la selección de texto, lanzar animaciones o integrar librerías que manipulan el DOM. En componentes funcionales se crean con useRef.',
  },
  {
    n: 11,
    categoria: 'Conceptos',
    pregunta: '¿Qué es un Higher Order Component (HOC)?',
    respuesta:
      'Es una función que recibe un componente y devuelve un componente nuevo con algo añadido. Sirve para reutilizar lógica entre muchos componentes. El más conocido era connect() de Redux. Si escribes el mismo código en muchos sitios, puedes moverlo a un HOC (o, hoy en día, a un custom hook).',
    codigo: `const conLog = (Componente) => (props) => {
  console.log('Props:', props)
  return <Componente {...props} />
}`,
  },
  {
    n: 12,
    categoria: 'Conceptos',
    pregunta: '¿Qué ventajas tienen las funciones flecha?',
    respuesta: '',
    puntos: [
      'No crean su propio this: usan el del contexto donde se escriben (muy útil en clases y callbacks).',
      'Son más cortas y fáciles de leer.',
      'Claridad: si casi todo son flechas, las funciones normales destacan.',
    ],
    codigo: `const doble = (n) => n * 2
<button onClick={() => borrar(id)}>Borrar</button>`,
  },
  {
    n: 13,
    categoria: 'Conceptos',
    pregunta: '¿Cómo evitas que un componente de clase se renderice?',
    respuesta:
      'Devolviendo null en render() no se pinta nada (aunque el ciclo de vida sigue funcionando). Para evitar renders innecesarios: implementa shouldComponentUpdate devolviendo false, o extiende React.PureComponent, que compara props y estado de forma superficial.',
    codigo: `shouldComponentUpdate(nextProps, nextState) {
  return nextProps.id !== this.props.id // solo repinta si cambia el id
}`,
    nota: 'En funciones: return null para no pintar y React.memo para evitar renders.',
  },
  {
    n: 14,
    categoria: 'Conceptos',
    pregunta: 'Al renderizar una lista, ¿qué es una key y para qué sirve?',
    respuesta:
      'Las keys ayudan a React a identificar qué elementos han cambiado, se han añadido o se han borrado. Deben ser únicas entre hermanos y estables. Lo ideal es usar el id de tus datos. El índice solo como último recurso, y nunca si la lista se puede reordenar.',
    codigo: `{usuarios.map((u) => <li key={u.id}>{u.nombre}</li>)}`,
  },
  {
    n: 15,
    categoria: 'Conceptos',
    pregunta: '¿Para qué sirve super(props)?',
    respuesta:
      'En una clase hija no puedes usar this hasta llamar a super(). Pasarle props permite usar this.props dentro del constructor.',
    codigo: `constructor(props) {
  super(props)
  this.state = { nombre: this.props.nombre }
}`,
  },
  {
    n: 16,
    categoria: 'Conceptos',
    pregunta: '¿Qué es JSX?',
    respuesta: '',
    puntos: [
      'Es una extensión de la sintaxis de JavaScript con toda su potencia. Genera “elementos” de React.',
      'Puedes meter cualquier expresión JS entre llaves { }. Al compilarse, JSX se convierte en objetos JS normales.',
      'Por eso puedes guardar JSX en variables, devolverlo desde funciones o pasarlo como argumento.',
    ],
  },
  {
    n: 17,
    categoria: 'Código',
    pregunta: '¿Cuál es el equivalente de este JSX con React.createElement?',
    respuesta: 'React.createElement(tipo, props, hijos):',
    codigo: `const element = <h1 className="greeting">Hello, world!</h1>

const element = React.createElement('h1', { className: 'greeting' }, 'Hello, world!')`,
  },
  {
    n: 18,
    categoria: 'Redux',
    pregunta: '¿Qué es Redux?',
    respuesta: '',
    puntos: [
      'Todo el estado de la app se guarda en un único store, que es un objeto JS.',
      'La única forma de cambiarlo es enviar acciones, que procesan los reducers.',
      'Los reducers no deben tener efectos secundarios (son funciones puras).',
    ],
  },
  {
    n: 19,
    categoria: 'Redux',
    pregunta: '¿Qué es el store en Redux?',
    respuesta: 'Es el objeto que guarda el estado de la app. Además:',
    puntos: [
      'Permite leer el estado con getState().',
      'Permite cambiarlo con dispatch(accion).',
      'Registra listeners con subscribe(listener).',
      'subscribe devuelve una función para darse de baja.',
    ],
  },
  {
    n: 20,
    categoria: 'Redux',
    pregunta: 'Diferencia entre acción y reducer.',
    respuesta:
      'Una ACCIÓN es un objeto JS simple con una propiedad type obligatoria que describe qué ha pasado; es el “mensaje” que lleva datos a la store. Un REDUCER es una función pura que recibe el estado anterior y una acción, y devuelve el nuevo estado.',
    codigo: `const accion = { type: 'carrito/agregar', payload: { id: 1 } }

function carrito(estado = [], accion) {
  if (accion.type === 'carrito/agregar') return [...estado, accion.payload]
  return estado
}`,
  },
  {
    n: 21,
    categoria: 'Redux',
    pregunta: '¿Para qué sirve Redux Thunk?',
    respuesta:
      'Es un middleware que permite que los “action creators” devuelvan una FUNCIÓN en vez de un objeto. Esa función puede esperar (por ejemplo, a una API) y despachar acciones más tarde. Sirve para la lógica asíncrona.',
    codigo: `const cargarUsuarios = () => async (dispatch) => {
  dispatch({ type: 'cargando' })
  const datos = await fetch('/api/usuarios').then((r) => r.json())
  dispatch({ type: 'cargados', payload: datos })
}`,
  },
]
