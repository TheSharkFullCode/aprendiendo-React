// Temas de la categoría "hooks"

export const HOOKS = [
  {
    id: 'use-state',
    titulo: 'useState',
    categoria: 'hooks',
    nivel: 'basico',
    icono: '🔢',
    resumen: 'La memoria del componente: datos que, al cambiar, repintan la pantalla.',
    queEs:
      'useState es un hook que da “memoria” a un componente. Devuelve un array con dos cosas: el valor actual y una función para cambiarlo. Cada vez que llamas a esa función, React vuelve a ejecutar el componente (re-render) con el nuevo valor. Una variable normal (let) no sirve: se reinicia en cada render y no avisa a React.',
    paraQue: ['Contadores, toggles (abierto/cerrado), inputs, listas…', 'Cualquier dato que cambia y debe verse en pantalla.'],
    secciones: [
      {
        titulo: 'Sintaxis',
        codigo: `import { useState } from 'react'

function Contador() {
  //     valor    función      valor inicial
  const [contador, setContador] = useState(0)

  return <button onClick={() => setContador(contador + 1)}>{contador}</button>
}`,
      },
      {
        titulo: 'Actualizar a partir del valor anterior',
        texto: 'Si el nuevo valor depende del anterior, pasa una función: recibe siempre el valor más reciente.',
        codigo: `setContador(contador + 1)          // usa el valor de ESTE render
setContador((prev) => prev + 1)    // ✅ usa el último valor real

setAbierto((prev) => !prev)        // toggle seguro`,
      },
      {
        titulo: 'Objetos en el estado',
        codigo: `const [usuario, setUsuario] = useState({ nombre: 'John', edad: 30 })

// ❌ usuario.edad = 31  (mutación)
// ✅ copia + cambio
setUsuario({ ...usuario, edad: usuario.edad + 1 })`,
      },
      {
        titulo: 'Inicialización perezosa',
        texto: 'Si el valor inicial es caro de calcular, pasa una función: solo se ejecuta en el primer render.',
        codigo: `const [notas, setNotas] = useState(() => JSON.parse(localStorage.getItem('notas')) ?? [])`,
      },
    ],
    demos: ['ContadorDemo', 'BatchingDemo'],
    errores: [
      'Esperar el valor nuevo justo después del set: setX(5); console.log(x) → todavía el antiguo. El cambio se ve en el siguiente render.',
      'Llamar a hooks dentro de if, bucles o funciones normales: siempre en el nivel superior del componente.',
      'setX(...) directamente en el cuerpo del componente → bucle infinito.',
    ],
    claves: ['const [valor, setValor] = useState(inicial).', 'Cambiar estado = re-render.', 'prev => ... cuando dependes del anterior.', 'Batching: varios set → un solo render.'],
    preguntas: [7, 34, 53, 54, 55, 57],
  },
  {
    id: 'use-effect',
    titulo: 'useEffect',
    categoria: 'hooks',
    nivel: 'intermedio',
    icono: '⚙️',
    resumen: 'Efectos secundarios: APIs, temporizadores, eventos del navegador y limpieza.',
    queEs:
      'useEffect ejecuta código DESPUÉS de que React pinte el componente. Sirve para sincronizarte con “el exterior”: pedir datos, poner temporizadores, escuchar eventos de window, cambiar el título... El array de dependencias decide CUÁNDO se vuelve a ejecutar, y la función que devuelves (cleanup) limpia antes de repetir o al desmontar.',
    paraQue: ['Pedir datos a una API al cargar.', 'setInterval / setTimeout.', 'addEventListener (y quitarlo).', 'Guardar en localStorage cuando algo cambia.'],
    secciones: [
      {
        titulo: 'Las 3 formas del array de dependencias',
        codigo: `useEffect(() => { /* ... */ })            // tras CADA render
useEffect(() => { /* ... */ }, [])        // solo al montar (1 vez)
useEffect(() => { /* ... */ }, [busqueda]) // al montar y cuando cambie busqueda`,
      },
      {
        titulo: 'Limpieza (cleanup)',
        texto: 'Todo lo que “enciendes” en un efecto, apágalo en el return.',
        codigo: `useEffect(() => {
  const onResize = () => setAncho(window.innerWidth)
  window.addEventListener('resize', onResize)
  const id = setInterval(() => console.log('tic'), 1000)

  return () => {
    window.removeEventListener('resize', onResize)
    clearInterval(id)
  }
}, [])`,
      },
      {
        titulo: 'Equivalencias con los ciclos de vida de clase',
        codigo: `componentDidMount      → useEffect(() => {...}, [])
componentDidUpdate     → useEffect(() => {...}, [dep])
componentWillUnmount   → return () => {...} dentro del efecto`,
        lenguaje: 'bash',
      },
      {
        titulo: 'useEffect vs useLayoutEffect',
        texto: 'useLayoutEffect se ejecuta ANTES de que el navegador pinte (bloquea el pintado). Úsalo solo para medir el DOM y evitar parpadeos; el 99% de las veces, useEffect.',
        codigo: `useLayoutEffect(() => {
  const { height } = ref.current.getBoundingClientRect()
  setAlto(height) // se aplica antes de que el usuario vea nada
}, [])`,
      },
    ],
    demos: ['UseEffectDemo'],
    errores: [
      'Olvidar dependencias → valores “congelados” (stale). Incluye todo lo que uses de fuera.',
      'Poner un objeto/array creado en el render como dependencia → se ejecuta siempre.',
      'Usar useEffect para calcular datos derivados: calcula directamente en el render.',
      'En desarrollo (StrictMode) el efecto se monta, desmonta y vuelve a montar: tu cleanup debe dejarlo todo bien.',
    ],
    claves: ['Efecto = sincronizar con el exterior.', '[] = al montar.', 'return () => limpieza.', 'Si no hay “exterior”, probablemente no necesitas useEffect.'],
    preguntas: [8, 46, 48, 56, 60],
  },
  {
    id: 'use-ref',
    titulo: 'useRef',
    categoria: 'hooks',
    nivel: 'intermedio',
    icono: '🎯',
    resumen: 'Acceder a elementos del DOM y guardar valores sin provocar re-render.',
    queEs:
      'useRef devuelve un objeto { current: valor } que se mantiene entre renders. Tiene dos usos: 1) apuntar a un elemento del DOM (ref={miRef}) para hacer focus, scroll, medir… y 2) guardar un valor mutable (id de un intervalo, valor anterior, contador interno) que NO debe repintar la pantalla al cambiar.',
    paraQue: ['Enfocar un input.', 'Detectar clics fuera de un menú.', 'Guardar el id de un setInterval.', 'Integrar librerías que necesitan un nodo del DOM.'],
    secciones: [
      {
        titulo: 'Enfocar un input al cargar',
        codigo: `function Buscador() {
  const inputRef = useRef(null)

  useEffect(() => {
    inputRef.current.focus()
  }, [])

  return <input ref={inputRef} />
}`,
      },
      {
        titulo: 'Detectar clic fuera (menús desplegables)',
        codigo: `function Desplegable() {
  const [abierto, setAbierto] = useState(false)
  const cajaRef = useRef(null)

  useEffect(() => {
    const clicFuera = (e) => {
      if (cajaRef.current && !cajaRef.current.contains(e.target)) setAbierto(false)
    }
    document.addEventListener('mousedown', clicFuera)
    return () => document.removeEventListener('mousedown', clicFuera)
  }, [])

  return (
    <div ref={cajaRef}>
      <button onClick={() => setAbierto(!abierto)}>Menú</button>
      {abierto && <ul><li>Opción 1</li><li>Opción 2</li></ul>}
    </div>
  )
}`,
      },
      {
        titulo: 'useRef vs useState',
        codigo: `useState → cambia y REPINTA        (lo que se ve en pantalla)
useRef   → cambia y NO repinta     (datos internos, nodos del DOM)`,
        lenguaje: 'bash',
      },
    ],
    demos: ['UseRefDemo'],
    errores: ['Leer ref.current durante el render para mostrarlo: no se actualiza en pantalla.', 'Usar refs para todo en lugar de estado (código imperativo).'],
    claves: ['ref.current = el valor.', 'ref={miRef} en JSX = nodo del DOM.', 'No provoca re-render.'],
    preguntas: [10, 29, 32, 59, 60, 61, 73],
  },
  {
    id: 'use-context',
    titulo: 'useContext',
    categoria: 'hooks',
    nivel: 'intermedio',
    icono: '🌐',
    resumen: 'Datos globales sin pasar props por todos los niveles (adiós prop drilling).',
    queEs:
      'Context permite compartir datos con todo un árbol de componentes sin pasarlos de mano en mano. Se hace en 3 pasos: crear el contexto (createContext), envolver el árbol con un Provider que da el valor, y leerlo en cualquier hijo con useContext. ¡Esta web entera usa un contexto: CuadernoContext!',
    paraQue: ['Usuario logueado, tema claro/oscuro, idioma, carrito…', 'Evitar el prop drilling.'],
    secciones: [
      {
        titulo: 'Patrón profesional: Provider + hook propio',
        codigo: `// context/TemaContext.jsx
import { createContext, useContext, useState } from 'react'

const TemaContext = createContext(null)                // 1) crear

export function TemaProvider({ children }) {
  const [tema, setTema] = useState('claro')
  const alternar = () => setTema((t) => (t === 'claro' ? 'oscuro' : 'claro'))
  return (
    <TemaContext.Provider value={{ tema, alternar }}>  {/* 2) proveer */}
      {children}
    </TemaContext.Provider>
  )
}

export const useTema = () => useContext(TemaContext)   // 3) consumir

// main.jsx
<TemaProvider><App /></TemaProvider>

// Cualquier componente
const { tema, alternar } = useTema()`,
      },
    ],
    demos: ['UseContextDemo'],
    errores: ['Usar useContext fuera del Provider → recibes el valor por defecto (null).', 'Meterlo todo en un único contexto gigante: cada cambio repinta a todos los consumidores. Divide por temas.'],
    claves: ['createContext → Provider → useContext.', 'Crea un hook propio (useTema, useAuth…).', 'Para estado global complejo: useReducer + Context, Zustand o Redux.'],
    preguntas: [36, 43],
  },
  {
    id: 'use-reducer',
    titulo: 'useReducer',
    categoria: 'hooks',
    nivel: 'avanzado',
    icono: '🧠',
    resumen: 'Estado complejo con acciones, como un mini-Redux dentro del componente.',
    queEs:
      'useReducer es una alternativa a useState para estado con muchas reglas. Toda la lógica vive en una función pura llamada reducer que recibe (estado, acción) y devuelve el nuevo estado. Desde los componentes solo “despachas” acciones: dispatch({ type: "agregar", producto }).',
    paraQue: ['Carritos, formularios grandes, juegos.', 'Cuando varios set van siempre juntos.', 'Centralizar y testear la lógica.'],
    secciones: [
      {
        titulo: 'Estructura',
        codigo: `const inicial = { cuenta: 0 }

function reducer(estado, accion) {
  switch (accion.type) {
    case 'sumar':   return { cuenta: estado.cuenta + 1 }
    case 'restar':  return { cuenta: estado.cuenta - 1 }
    case 'fijar':   return { cuenta: accion.valor }
    default:        throw new Error('Acción desconocida: ' + accion.type)
  }
}

function Contador() {
  const [estado, dispatch] = useReducer(reducer, inicial)
  return (
    <>
      <p>{estado.cuenta}</p>
      <button onClick={() => dispatch({ type: 'sumar' })}>+</button>
      <button onClick={() => dispatch({ type: 'fijar', valor: 10 })}>10</button>
    </>
  )
}`,
      },
    ],
    demos: ['UseReducerDemo'],
    errores: ['Mutar el estado dentro del reducer.', 'Hacer fetch o efectos dentro del reducer: debe ser puro.'],
    claves: ['reducer(estado, accion) → nuevo estado.', 'dispatch({ type, ...datos }).', 'Es la misma idea que Redux.'],
    preguntas: [18, 20],
  },
  {
    id: 'use-memo-callback',
    titulo: 'useMemo, useCallback y memo',
    categoria: 'hooks',
    nivel: 'avanzado',
    icono: '⚡',
    resumen: 'Memorizar cálculos y funciones para evitar trabajo y renders innecesarios.',
    queEs:
      'useMemo recuerda el RESULTADO de un cálculo y solo lo repite si cambian sus dependencias. useCallback recuerda una FUNCIÓN (la misma referencia entre renders). memo() envuelve un componente para que no se repinte si sus props no cambian. useCallback suele ir junto a memo. Desde 2025, el React Compiler puede hacer esto automáticamente si lo activas en tu proyecto.',
    paraQue: ['Filtrar/ordenar listas muy grandes.', 'Pasar funciones a hijos memorizados.', 'Optimizar SOLO cuando hay un problema real de rendimiento.'],
    secciones: [
      {
        titulo: 'Diferencia clave',
        codigo: `// useMemo: ejecuta la función y guarda lo que DEVUELVE
const total = useMemo(() => carrito.reduce((t, p) => t + p.precio, 0), [carrito])

// useCallback: guarda la FUNCIÓN sin ejecutarla
const borrar = useCallback((id) => setItems((xs) => xs.filter((x) => x.id !== id)), [])

// useCallback(fn, deps) es lo mismo que useMemo(() => fn, deps)`,
      },
      {
        titulo: 'memo para componentes',
        codigo: `const Fila = memo(function Fila({ item, alBorrar }) {
  return <li>{item.nombre} <button onClick={() => alBorrar(item.id)}>x</button></li>
})`,
      },
    ],
    demos: ['UseMemoDemo'],
    errores: ['Memorizarlo todo “por si acaso”: añade complejidad y memoria.', 'Olvidar dependencias: devuelve valores viejos.'],
    claves: ['useMemo = valor.', 'useCallback = función.', 'memo = componente.', 'Primero mide, luego optimiza.'],
    preguntas: [37, 40],
  },
  {
    id: 'otros-hooks',
    titulo: 'Otros hooks: useId, useTransition, useDeferredValue...',
    categoria: 'hooks',
    nivel: 'avanzado',
    icono: '🧰',
    resumen: 'Hooks menos frecuentes pero que salen en entrevistas, incluidos los de React 19.',
    queEs:
      'Además de los básicos, React trae hooks para casos concretos: ids accesibles, mantener la interfaz fluida con actualizaciones costosas y, desde React 19, gestionar formularios y acciones asíncronas.',
    paraQue: ['Accesibilidad (label ↔ input).', 'Listas grandes sin bloquear el teclado.', 'Formularios con estados de envío.'],
    secciones: [
      {
        titulo: 'Resumen rápido',
        codigo: `useId()               // id único y estable: <label htmlFor={id}> (¡no para keys!)
useDeferredValue(v)   // versión “retrasada” de v para renders costosos
useTransition()       // [pendiente, startTransition] → marca updates como no urgentes
useLayoutEffect()     // como useEffect pero antes de pintar
useImperativeHandle() // expone métodos de un hijo a través de ref

// React 19
use(promesa | contexto)              // leer una promesa (con Suspense) o un contexto
useActionState(accion, inicial)      // estado + acción de formulario + isPending
useFormStatus()                      // ¿se está enviando el <form> padre?
useOptimistic(estado, actualizar)    // mostrar el cambio antes de que responda el servidor`,
      },
      {
        titulo: 'useActionState (React 19)',
        codigo: `async function suscribir(estadoPrevio, formData) {
  const email = formData.get('email')
  if (!email.includes('@')) return { error: 'Email no válido' }
  await fetch('/api/suscribir', { method: 'POST', body: formData })
  return { ok: true }
}

function Newsletter() {
  const [estado, accion, enviando] = useActionState(suscribir, {})
  return (
    <form action={accion}>
      <input name="email" />
      <button disabled={enviando}>{enviando ? 'Enviando...' : 'Suscribirme'}</button>
      {estado.error && <p>{estado.error}</p>}
    </form>
  )
}`,
      },
    ],
    demos: ['OtrosHooksDemo'],
    errores: ['Usar useId como key de listas.', 'useLayoutEffect para todo: bloquea el pintado.'],
    claves: ['useId → accesibilidad.', 'useDeferredValue/useTransition → fluidez.', 'React 19 → acciones y formularios.'],
    preguntas: [24, 27, 48],
  },
  {
    id: 'custom-hooks',
    titulo: 'Custom hooks',
    categoria: 'hooks',
    nivel: 'avanzado',
    icono: '🪝',
    resumen: 'Crea tus propios hooks para reutilizar lógica entre componentes.',
    queEs:
      'Un custom hook es una función cuyo nombre empieza por “use” y que usa otros hooks dentro. No comparte el estado entre componentes: comparte la LÓGICA. Cada componente que lo usa tiene su propia copia del estado. Esta web usa useLocalStorage, useDebounce, useCopiar y useScrollArriba.',
    paraQue: ['Extraer lógica repetida (fetch, formularios, localStorage).', 'Dejar los componentes cortos y legibles.'],
    secciones: [
      {
        titulo: 'useDebounce (esperar a que el usuario deje de escribir)',
        codigo: `export default function useDebounce(valor, espera = 500) {
  const [retrasado, setRetrasado] = useState(valor)

  useEffect(() => {
    const id = setTimeout(() => setRetrasado(valor), espera)
    return () => clearTimeout(id) // si vuelve a escribir, se cancela
  }, [valor, espera])

  return retrasado
}`,
      },
      {
        titulo: 'useFetch',
        codigo: `export default function useFetch(url) {
  const [datos, setDatos] = useState(null)
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const ctrl = new AbortController()
    setCargando(true)
    fetch(url, { signal: ctrl.signal })
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(r.status))))
      .then(setDatos)
      .catch((e) => e.name !== 'AbortError' && setError(e.message))
      .finally(() => setCargando(false))
    return () => ctrl.abort()
  }, [url])

  return { datos, cargando, error }
}

// Uso
const { datos, cargando, error } = useFetch('https://api.github.com/users/torvalds')`,
      },
      {
        titulo: 'useModoOscuro',
        codigo: `export default function useModoOscuro() {
  const [oscuro, setOscuro] = useState(() => localStorage.getItem('oscuro') === 'true')

  const alternar = () =>
    setOscuro((prev) => {
      localStorage.setItem('oscuro', String(!prev))
      return !prev
    })

  return { oscuro, alternar }
}`,
      },
    ],
    demos: ['CustomHookDemo'],
    errores: ['No empezar por “use”: React no aplica las reglas de los hooks.', 'Pensar que dos componentes comparten estado por usar el mismo hook (no lo hacen).'],
    claves: ['Nombre useAlgo.', 'Comparte lógica, no estado.', 'Devuelve lo que necesites: valor, array u objeto.'],
    preguntas: [22, 23, 47, 58],
  },
]
