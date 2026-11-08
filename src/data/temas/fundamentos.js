// Temas de la categoría "fundamentos"
// Estructura de cada tema: ver ARQUITECTURA.md → "Formato de un tema"

export const FUNDAMENTOS = [
  {
    id: 'que-es-react',
    titulo: '¿Qué es React?',
    categoria: 'fundamentos',
    nivel: 'basico',
    icono: '⚛️',
    resumen: 'La librería de JavaScript para construir interfaces a base de componentes.',
    queEs:
      'React es una librería de JavaScript creada por Facebook (Meta) para construir interfaces de usuario. En lugar de tocar el HTML a mano con document.querySelector, describes CÓMO debe verse la pantalla según los datos, y React se encarga de actualizarla cuando esos datos cambian.',
    paraQue: [
      'Dividir la web en piezas reutilizables llamadas componentes (como piezas de Lego).',
      'Crear SPAs (Single Page Applications): webs que cambian de “página” sin recargar.',
      'Actualizar solo lo necesario gracias al Virtual DOM, lo que hace la web rápida.',
      'Programar de forma declarativa: dices QUÉ quieres, no CÓMO hacerlo paso a paso.',
    ],
    secciones: [
      {
        titulo: 'Imperativo (JS puro) vs declarativo (React)',
        texto:
          'Con JavaScript puro tienes que buscar el elemento y cambiarlo tú. Con React solo cambias el dato y la pantalla se actualiza sola.',
        codigo: `// ❌ JavaScript puro (imperativo)
const boton = document.querySelector('#btn')
const span = document.querySelector('#contador')
let contador = 0
boton.addEventListener('click', () => {
  contador++
  span.textContent = contador
})

// ✅ React (declarativo)
function Contador() {
  const [contador, setContador] = useState(0)
  return <button onClick={() => setContador(contador + 1)}>{contador}</button>
}`,
      },
      {
        titulo: '¿Cómo funciona el Virtual DOM?',
        texto:
          'React guarda una copia ligera del DOM en memoria (Virtual DOM). Cuando cambia el estado: 1) crea un nuevo Virtual DOM, 2) lo compara con el anterior (diffing) y 3) aplica en el DOM real SOLO las diferencias (reconciliación).',
        codigo: `Estado cambia  →  Nuevo Virtual DOM
                     ↓
          Comparar con el anterior (diffing)
                     ↓
   Actualizar en el DOM real SOLO lo que cambió`,
        lenguaje: 'bash',
      },
    ],
    errores: [
      'Pensar que React es un framework completo: es una librería para la vista. Para rutas usas React Router; para SSR, Next.js.',
      'Modificar el DOM a mano (document.getElementById) dentro de componentes: deja que React lo haga.',
    ],
    claves: [
      'React = componentes + estado + Virtual DOM.',
      'La UI es una función del estado: UI = f(estado).',
      'Datos fluyen de padres a hijos (flujo unidireccional).',
    ],
    preguntas: [1, 2, 49, 62, 63],
  },
  {
    id: 'primer-proyecto',
    titulo: 'Tu primer proyecto con Vite',
    categoria: 'fundamentos',
    nivel: 'basico',
    icono: '⚡',
    resumen: 'Crear, entender la estructura y arrancar un proyecto React moderno.',
    queEs:
      'Vite es la herramienta que crea y sirve tu proyecto React. Arranca en milisegundos, recarga los cambios al instante (HMR) y genera la versión final optimizada con "npm run build". Create React App está obsoleto desde 2025: hoy se usa Vite (o un framework como Next.js).',
    paraQue: [
      'Crear la estructura del proyecto con un solo comando.',
      'Tener un servidor de desarrollo con recarga instantánea.',
      'Compilar JSX y generar la carpeta dist/ lista para subir a un servidor.',
    ],
    secciones: [
      {
        titulo: 'Crear el proyecto',
        texto: 'npm instala paquetes; npx ejecuta un paquete sin instalarlo de forma global.',
        codigo: `npm create vite@latest mi-app -- --template react
cd mi-app
npm install
npm run dev        # abre http://localhost:5173

# Añadir Tailwind CSS v4
npm install tailwindcss @tailwindcss/vite`,
        lenguaje: 'bash',
      },
      {
        titulo: 'Estructura básica',
        texto: 'index.html carga main.jsx, que monta el componente <App /> dentro del div#root.',
        codigo: `mi-app/
├── index.html          ← tiene <div id="root">
├── package.json        ← dependencias y scripts
├── vite.config.js      ← plugins (react, tailwind)
└── src/
    ├── main.jsx        ← punto de entrada
    ├── App.jsx         ← componente principal
    └── index.css       ← @import "tailwindcss";`,
        lenguaje: 'bash',
      },
      {
        titulo: 'main.jsx: donde React toma el control',
        codigo: `import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)`,
      },
    ],
    errores: [
      'Ejecutar "npm run dev" fuera de la carpeta del proyecto (donde no está package.json).',
      'Subir node_modules a GitHub: va en .gitignore, se regenera con npm install.',
      'Asustarse porque StrictMode ejecuta dos veces los efectos en desarrollo: es a propósito, para detectar errores.',
    ],
    claves: ['npm = instalar · npx = ejecutar.', 'npm run dev = desarrollar · npm run build = producción.', 'Vite > Create React App.'],
    preguntas: [31, 38],
  },
  {
    id: 'jsx',
    titulo: 'JSX',
    categoria: 'fundamentos',
    nivel: 'basico',
    icono: '🧩',
    resumen: 'Escribir “HTML” dentro de JavaScript, con expresiones entre llaves.',
    queEs:
      'JSX es una extensión de la sintaxis de JavaScript que parece HTML. No es HTML: Vite lo transforma en llamadas a funciones de React que crean objetos (elementos). Dentro de { } puedes poner cualquier EXPRESIÓN de JavaScript: variables, operaciones, llamadas a funciones, ternarios...',
    paraQue: ['Describir la interfaz de forma visual y legible.', 'Mezclar datos y marcado en el mismo sitio.'],
    secciones: [
      {
        titulo: 'Reglas de oro de JSX',
        texto: 'Un solo elemento padre, etiquetas cerradas, className en vez de class y atributos en camelCase.',
        codigo: `function Perfil() {
  const nombre = 'Oscar'
  const avatar = '/oscar.png'

  return (
    <>                                      {/* Fragment: padre invisible */}
      <h1 className="titulo">Hola {nombre}</h1>
      <img src={avatar} alt="avatar" />    {/* etiqueta autocerrada */}
      <label htmlFor="email">Email</label> {/* htmlFor, no for */}
      <input id="email" onChange={() => {}} />
      <p style={{ color: 'red', fontSize: 20 }}>Estilo en línea</p>
    </>
  )
}`,
      },
      {
        titulo: 'Lo que hay detrás de JSX',
        texto: 'Esto es lo que genera Vite a partir de tu JSX. Por eso necesitas un único elemento raíz: una función solo puede devolver un valor.',
        codigo: `// Lo que escribes
const elemento = <h1 className="saludo">Hola, mundo</h1>

// Lo que se ejecuta realmente
const elemento = React.createElement('h1', { className: 'saludo' }, 'Hola, mundo')`,
      },
    ],
    demos: ['HolaJsxDemo'],
    errores: [
      'Poner un if o un for dentro de { }: solo admite expresiones. Usa ternarios y .map().',
      'Escribir class="..." en lugar de className="...".',
      'Devolver dos elementos hermanos sin envolverlos en <>...</>.',
    ],
    claves: ['{ } = “aquí va JavaScript”.', 'className, htmlFor, onClick (camelCase).', 'Fragment <></> para no añadir divs extra.'],
    preguntas: [16, 17],
  },
  {
    id: 'componentes',
    titulo: 'Componentes',
    categoria: 'fundamentos',
    nivel: 'basico',
    icono: '🧱',
    resumen: 'Funciones que devuelven JSX y se usan como etiquetas propias.',
    queEs:
      'Un componente es una función de JavaScript cuyo nombre empieza por MAYÚSCULA y que devuelve JSX. Es una pieza independiente y reutilizable de la interfaz: un botón, una tarjeta, una página entera... Se usan como si fueran etiquetas HTML: <MiComponente />.',
    paraQue: [
      'Reutilizar la misma pieza en muchos sitios sin copiar y pegar.',
      'Separar responsabilidades: cada archivo hace una cosa.',
      'Componer interfaces grandes a partir de piezas pequeñas.',
    ],
    secciones: [
      {
        titulo: 'Crear, exportar e importar',
        texto: 'Lo habitual es un componente por archivo, con el mismo nombre que el componente.',
        codigo: `// src/components/Saludo.jsx
export default function Saludo() {
  return <h2>¡Hola desde un componente!</h2>
}

// src/App.jsx
import Saludo from './components/Saludo'

export default function App() {
  return (
    <main>
      <Saludo />
      <Saludo />  {/* ¡reutilizado! */}
    </main>
  )
}`,
      },
      {
        titulo: '¿Por qué con mayúscula?',
        texto: 'JSX trata las etiquetas en minúscula como HTML (<div>) y las que empiezan en mayúscula como componentes (<Div>).',
        codigo: `function boton() { return <button>OK</button> }
<boton />   // ❌ React busca una etiqueta HTML <boton> que no existe

function Boton() { return <button>OK</button> }
<Boton />   // ✅ React llama a tu función`,
      },
    ],
    demos: ['ComponentesDemo'],
    errores: ['Nombrar el componente en minúscula.', 'Definir un componente DENTRO de otro: se recrea en cada render y pierde su estado.'],
    claves: ['Componente = función + Mayúscula + return JSX.', 'Un componente por archivo.', 'Componentes pequeños y con una sola responsabilidad.'],
    preguntas: [3, 4, 30],
  },
  {
    id: 'props',
    titulo: 'Props y children',
    categoria: 'fundamentos',
    nivel: 'basico',
    icono: '📦',
    resumen: 'Pasar datos de un componente padre a un hijo.',
    queEs:
      'Las props (propiedades) son los “parámetros” de un componente. El padre las envía como atributos y el hijo las recibe como un objeto. Son de SOLO LECTURA: el hijo nunca las modifica. children es una prop especial con lo que pongas entre la etiqueta de apertura y la de cierre.',
    paraQue: ['Personalizar un mismo componente con datos distintos.', 'Pasar funciones del padre al hijo para que el hijo “avise” al padre.', 'Crear componentes contenedor (layouts, modales, tarjetas) con children.'],
    secciones: [
      {
        titulo: 'Enviar y recibir props (con desestructuración)',
        codigo: `// Padre
<Producto nombre="Café" precio={1.5} enOferta />

// Hijo: desestructuramos el objeto props y damos valores por defecto
function Producto({ nombre, precio, enOferta = false }) {
  return (
    <p>
      {nombre}: {precio} € {enOferta && '🔥'}
    </p>
  )
}`,
      },
      {
        titulo: 'children y pasar funciones',
        codigo: `function Tarjeta({ titulo, children }) {
  return (
    <section className="rounded-xl p-4 shadow">
      <h3>{titulo}</h3>
      {children}
    </section>
  )
}

function App() {
  const avisar = (msg) => alert(msg)
  return (
    <Tarjeta titulo="Mi tarjeta">
      <p>Todo esto es children</p>
      <BotonHijo alPulsar={avisar} />
    </Tarjeta>
  )
}

function BotonHijo({ alPulsar }) {
  return <button onClick={() => alPulsar('¡Hola papá!')}>Avisar</button>
}`,
      },
      {
        titulo: 'Spread de props',
        texto: 'Útil para pasar “el resto” de props a un elemento HTML.',
        codigo: `function Input({ etiqueta, ...resto }) {
  return (
    <label>
      {etiqueta}
      <input {...resto} />   {/* type, value, onChange, placeholder... */}
    </label>
  )
}`,
      },
    ],
    demos: ['PropsDemo'],
    errores: ['Intentar cambiar una prop (props.nombre = "x"): son inmutables.', 'Olvidar las llaves para valores que no son texto: precio={1.5}, no precio="1.5".', 'Prop drilling: pasar props por 4 o 5 niveles. Solución: useContext.'],
    claves: ['Props: padre → hijo, solo lectura.', 'Estado: datos propios que cambian.', 'Funciones como props = el hijo avisa al padre.'],
    preguntas: [5, 25],
  },
  {
    id: 'eventos',
    titulo: 'Eventos',
    categoria: 'fundamentos',
    nivel: 'basico',
    icono: '🖱️',
    resumen: 'Responder a clics, teclas, cambios de input y envíos de formulario.',
    queEs:
      'Los eventos en React se escriben en camelCase (onClick, onChange, onSubmit) y reciben una FUNCIÓN, no una llamada. React te da un objeto evento (e) con información: e.target.value, e.key, e.preventDefault()...',
    paraQue: ['Reaccionar a lo que hace el usuario.', 'Leer lo que escribe en un input.', 'Evitar que un formulario recargue la página.'],
    secciones: [
      {
        titulo: 'Pasar la función, no ejecutarla',
        codigo: `function saludar() { alert('Hola') }

<button onClick={saludar}>OK</button>          // ✅ pasa la función
<button onClick={saludar()}>MAL</button>       // ❌ se ejecuta al pintar
<button onClick={() => saludar()}>OK</button>  // ✅ función flecha

// Con parámetros: SIEMPRE con función flecha
<button onClick={() => borrar(id)}>Borrar</button>`,
      },
      {
        titulo: 'El objeto evento',
        codigo: `function Formulario() {
  const handleSubmit = (e) => {
    e.preventDefault()          // no recargar la página
    console.log('Enviado')
  }

  return (
    <form onSubmit={handleSubmit}>
      <input onChange={(e) => console.log(e.target.value)} />
      <input onKeyDown={(e) => e.key === 'Enter' && console.log('Enter!')} />
      <button type="submit">Enviar</button>
    </form>
  )
}`,
      },
    ],
    demos: ['EventosDemo'],
    errores: ['onClick={funcion()} → se ejecuta al renderizar (y puede crear bucles infinitos con setState).', 'Olvidar e.preventDefault() en onSubmit.'],
    claves: ['onClick={fn} o onClick={() => fn(x)}.', 'e.target.value = lo escrito.', 'Nombres en camelCase.'],
    preguntas: [12],
  },
]
