// Preguntas de entrevista 42-66

export const PREGUNTAS_3 = [
  {
    n: 42,
    categoria: 'Hooks',
    pregunta: '¿Qué es un hook y por qué es útil?',
    respuesta:
      'Un hook es una función de React (empieza por “use”) que permite usar estado y otras características sin escribir clases. Así los componentes funcionales, más simples de leer y escribir, pueden hacerlo todo.',
  },
  {
    n: 43,
    categoria: 'Hooks',
    pregunta: '¿Qué hooks se usan más?',
    respuesta: 'useState (estado local), useEffect (efectos secundarios) y useContext (leer valores del Provider más cercano). Les siguen useRef, useMemo, useCallback y useReducer.',
  },
  {
    n: 44,
    categoria: 'Hooks',
    pregunta: '¿Se pueden usar hooks dentro de un componente de clase?',
    respuesta:
      'No. Los hooks solo funcionan en componentes funcionales (y en custom hooks). En una clase se usa this.state y los métodos de ciclo de vida. Truco: puedes envolver la clase con un componente funcional que use el hook y le pase el valor por props.',
  },
  {
    n: 45,
    categoria: 'Hooks',
    pregunta: '¿Cómo se testea un componente que usa hooks?',
    respuesta:
      'Con React Testing Library: renderizas el componente, simulas lo que hace el usuario y compruebas lo que aparece en pantalla. La utilidad act() asegura que React ha aplicado todas las actualizaciones (RTL ya la usa por dentro). Las comprobaciones se hacen con Jest o Vitest.',
    codigo: `test('suma al pulsar', async () => {
  render(<Contador />)
  await userEvent.click(screen.getByText('+1'))
  expect(screen.getByText('1')).toBeInTheDocument()
})`,
    nota: 'Enzyme, que menciona el original, ya no se mantiene. Usa React Testing Library + Vitest.',
  },
  {
    n: 46,
    categoria: 'Hooks',
    pregunta: '¿Para qué sirve useEffect?',
    respuesta:
      'Para efectos secundarios en componentes funcionales: pedir datos, suscribirse a eventos, temporizadores o tocar el DOM. Se ejecuta DESPUÉS del render y mantiene el componente sincronizado con sus dependencias.',
  },
  {
    n: 47,
    categoria: 'Hooks',
    pregunta: 'Crea un custom hook sencillo.',
    respuesta: 'Un hook de contador que devuelve el valor y la función para incrementarlo:',
    codigo: `function useContador() {
  const [cuenta, setCuenta] = useState(0)
  const incrementar = () => setCuenta((c) => c + 1)
  return { cuenta, incrementar }
}

function MiComponente() {
  const { cuenta, incrementar } = useContador()
  return (
    <div>
      <p>La cuenta es {cuenta}.</p>
      <button onClick={incrementar}>Incrementar</button>
    </div>
  )
}`,
  },
  {
    n: 48,
    categoria: 'Hooks',
    pregunta: '¿Qué diferencia hay entre useEffect y useLayoutEffect?',
    respuesta:
      'useEffect se ejecuta DESPUÉS de que el navegador pinte la pantalla (no bloquea). useLayoutEffect se ejecuta justo DESPUÉS del render pero ANTES de pintar, y bloquea el pintado hasta que termina. Usa useLayoutEffect solo cuando necesites medir el DOM y corregir algo antes de que el usuario lo vea (evitar un parpadeo). Para todo lo demás, useEffect.',
    codigo: `useEffect(() => console.log('después de pintar'))
useLayoutEffect(() => console.log('antes de pintar'))
// En consola aparece primero "antes de pintar"`,
    nota: 'Corrección: el original decía que useLayoutEffect “causa inconsistencias visuales”. Es al revés: sirve precisamente para EVITARLAS; su coste es que puede ralentizar el pintado.',
  },
  {
    n: 49,
    categoria: 'Conceptos',
    pregunta: '¿Por qué el Virtual DOM es más rápido de actualizar que el DOM real?',
    respuesta:
      'Tocar el DOM real es caro (el navegador recalcula estilos y posiciones). Con el Virtual DOM, React hace los cálculos en memoria, compara la versión nueva con la anterior y luego aplica en el DOM real solo los cambios mínimos y agrupados. No es que el Virtual DOM sea “mágico”: lo que ahorra es trabajo innecesario en el DOM real.',
  },
  {
    n: 50,
    categoria: 'Conceptos',
    pregunta: 'Diferencia entre función pura e impura y por qué importa en React.',
    respuesta:
      'Una función pura devuelve siempre lo mismo con las mismas entradas y no modifica nada de fuera. Una impura puede devolver resultados distintos (Math.random, fechas) o cambiar cosas externas. React espera que tus componentes sean puros durante el render: son más predecibles, fáciles de testear y permiten optimizaciones.',
    codigo: `function sumar(a, b) { return a + b }       // ✅ pura
function aleatorio() { return Math.random() } // ❌ impura`,
  },
  {
    n: 51,
    categoria: 'Código',
    pregunta: 'Explica Styled Components con un ejemplo.',
    respuesta: 'Es una librería que permite escribir CSS real dentro de JS, creando componentes ya estilizados. Los estilos pueden depender de las props.',
    codigo: `import styled from 'styled-components'

const Boton = styled.button\`
  background: \${(props) => (props.$primario ? 'palevioletred' : 'white')};
  color: \${(props) => (props.$primario ? 'white' : 'palevioletred')};
  border-radius: 3px;
  border: none;
\`

<Boton>Normal</Boton>
<Boton $primario>Primario</Boton>`,
  },
  {
    n: 52,
    categoria: 'Conceptos',
    pregunta: '¿Styled Components o estilos en línea?',
    respuesta: 'Depende del proyecto:',
    puntos: [
      'Estilos en línea (style={{ }}): simples, sin librerías, buenos para valores dinámicos. Pero ensucian el JSX, no admiten :hover ni media queries y cuesta reutilizarlos.',
      'Styled Components: CSS completo, modular y junto al componente. Pero añade una librería y algo de curva de aprendizaje.',
      'Hoy la opción más popular es Tailwind CSS (la que usa esta web).',
    ],
  },
  {
    n: 53,
    categoria: 'Adivina la salida',
    pregunta: '¿Qué se muestra tras pulsar “Click me” dos veces?',
    respuesta: '“You clicked 2 times”. Cada clic hace un set y un render nuevo, así que no hay batching entre clics distintos.',
    codigo: `const [count, setCount] = useState(0)
<p>You clicked {count} times</p>
<button onClick={() => setCount(count + 1)}>Click me</button>`,
  },
  {
    n: 54,
    categoria: 'Adivina la salida',
    pregunta: '¿Qué se muestra tras pulsar “Increment age” tres veces?',
    respuesta: '“My name is John and I am 33 years old”. El spread (...state) mantiene el nombre y solo cambia la edad.',
    codigo: `const [state, setState] = useState({ name: 'John', age: 30 })
<button onClick={() => setState({ ...state, age: state.age + 1 })}>Increment age</button>`,
  },
  {
    n: 55,
    categoria: 'Adivina la salida',
    pregunta: '¿Qué hobbies se ven si pulsas “Add hobby” dos veces y recargas la página?',
    respuesta:
      'Solo “reading” y “running”. El estado vive en memoria: al recargar se pierde y vuelve al valor inicial. (Antes de recargar sí se verían los dos “swimming” añadidos). Para conservarlo habría que usar localStorage.',
  },
  {
    n: 56,
    categoria: 'Adivina la salida',
    pregunta: '¿Qué sale en consola si pulsas “Increment” dos veces y “Reset” una?',
    respuesta:
      'Solo un “count updated”, y sale al cargar el componente (no por los botones). Como el array de dependencias está vacío, el efecto se ejecuta únicamente al montar. Ni Increment ni Reset lo vuelven a disparar.',
    codigo: `useEffect(() => {
  console.log('count updated')
}, []) // [] → solo al montar

// Para que se ejecute en cada cambio: }, [count])`,
    nota: 'Corrección: el original decía que Reset volvía a ejecutar el efecto. No es así. (En desarrollo con StrictMode puede salir dos veces al montar.)',
  },
  {
    n: 57,
    categoria: 'Código',
    pregunta: 'Crea tu propio useState para un proyecto de JavaScript puro.',
    respuesta: 'Se guarda el estado en una closure (variable que la función recuerda) y al cambiarlo se llama a una función render propia.',
    codigo: `function crearEstado(inicial, render) {
  let estado = inicial
  const getEstado = () => estado
  const setEstado = (nuevo) => {
    estado = typeof nuevo === 'function' ? nuevo(estado) : nuevo
    render()
  }
  return [getEstado, setEstado]
}

const [getContador, setContador] = crearEstado(0, pintar)
function pintar() {
  document.querySelector('#contador').textContent = getContador()
}`,
    nota: 'Mejora: el original devolvía "state" directamente, que se quedaba con el valor antiguo. Con un getter siempre lees el actual.',
  },
  {
    n: 58,
    categoria: 'Hooks',
    pregunta: 'Escribe un custom hook para modo oscuro/claro.',
    respuesta: 'Guarda la preferencia en localStorage para que se mantenga entre visitas.',
    codigo: `const useModoOscuro = () => {
  const [oscuro, setOscuro] = useState(localStorage.getItem('oscuro') === 'true')

  const alternar = () =>
    setOscuro((prev) => {
      localStorage.setItem('oscuro', !prev)
      return !prev
    })

  return { oscuro, alternar }
}

const App = () => {
  const { oscuro, alternar } = useModoOscuro()
  return (
    <div className={oscuro ? 'bg-gray-900 text-white' : 'bg-white'}>
      <button onClick={alternar}>{oscuro ? 'Modo claro' : 'Modo oscuro'}</button>
    </div>
  )
}`,
  },
  {
    n: 59,
    categoria: 'Hooks',
    pregunta: '¿Cómo leer el valor actual de un input con useRef?',
    respuesta: 'Pones la ref en el input y lees ref.current.value cuando lo necesites (input NO controlado).',
    codigo: `const inputRef = useRef(null)
const mostrar = () => console.log(inputRef.current.value)

<input ref={inputRef} />
<button onClick={mostrar}>Mostrar valor</button>`,
  },
  {
    n: 60,
    categoria: 'Hooks',
    pregunta: '¿Cómo crear un contador que suma cada segundo usando useRef?',
    respuesta: 'useRef guarda el id del intervalo (no necesita repintar) para poder limpiarlo al desmontar.',
    codigo: `const Contador = () => {
  const [cuenta, setCuenta] = useState(0)
  const intervaloRef = useRef()

  useEffect(() => {
    intervaloRef.current = setInterval(() => setCuenta((c) => c + 1), 1000)
    return () => clearInterval(intervaloRef.current)
  }, [])

  return <h1>{cuenta}</h1>
}`,
  },
  {
    n: 61,
    categoria: 'Hooks',
    pregunta: '¿Cómo hacer un menú desplegable con useRef?',
    respuesta: 'Estado para abierto/cerrado y una ref para cerrar el menú cuando se hace clic fuera.',
    codigo: `const Desplegable = () => {
  const [abierto, setAbierto] = useState(false)
  const menuRef = useRef(null)

  useEffect(() => {
    const clicFuera = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setAbierto(false)
    }
    document.addEventListener('mousedown', clicFuera)
    return () => document.removeEventListener('mousedown', clicFuera)
  }, [])

  return (
    <div ref={menuRef}>
      <button onClick={() => setAbierto(!abierto)}>Menú</button>
      {abierto && <ul><li>Opción 1</li><li>Opción 2</li><li>Opción 3</li></ul>}
    </div>
  )
}`,
  },
  {
    n: 62,
    categoria: 'Conceptos',
    pregunta: '¿Puedes explicar la arquitectura de React en una frase?',
    respuesta: 'React es como un juego de Lego virtual: cada componente es una pieza que se combina con otras para construir interfaces complejas.',
  },
  {
    n: 63,
    categoria: 'Conceptos',
    pregunta: '¿Cómo sabe React qué tiene que pintar?',
    respuesta: 'Usa el Virtual DOM para seguir el estado de la app y calcular qué cambios hay que aplicar al DOM real para reflejarlo.',
  },
  {
    n: 64,
    categoria: 'Conceptos',
    pregunta: 'Si React fuera una comida, ¿cuál sería?',
    respuesta: 'Una bandeja de sushi: cada pieza es un componente, y combinándolas de distintas formas creas una experiencia única. (Pregunta “rompehielos” para ver si entiendes los componentes.)',
  },
  {
    n: 65,
    categoria: 'Conceptos',
    pregunta: '¿Qué significa “levantar el estado” (lifting state up)?',
    respuesta:
      'Mover el estado de un componente hijo a su padre común para que varios hermanos puedan compartirlo. El padre guarda el estado y pasa el valor y las funciones por props.',
    codigo: `function App() {
  const [cuenta, setCuenta] = useState(0)
  return (
    <div>
      <h1>Cuenta: {cuenta}</h1>
      <BotonSumar alSumar={() => setCuenta(cuenta + 1)} />
      <BotonReset setCuenta={setCuenta} />
    </div>
  )
}
const BotonSumar = ({ alSumar }) => <button onClick={alSumar}>Sumar</button>
const BotonReset = ({ setCuenta }) => <button onClick={() => setCuenta(0)}>Reset</button>`,
  },
  {
    n: 66,
    categoria: 'Conceptos',
    pregunta: '¿En qué se diferencia Next.js de React y qué aporta?',
    respuesta:
      'Next.js es un framework construido sobre React. Añade renderizado en servidor (SSR) y generación estática (SSG), que mejoran la velocidad de carga y el SEO; rutas basadas en carpetas, división de código automática, optimización de imágenes y endpoints de API. React solo es la librería de la interfaz; Next.js te da la aplicación completa.',
  },
]
