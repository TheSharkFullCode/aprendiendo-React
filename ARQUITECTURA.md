# 📓 Cuaderno React — Arquitectura del proyecto

> **Para Claude / NEXUS:** lee este archivo PRIMERO. Describe todo el proyecto para no tener que leer cada archivo.
> Si cambias la estructura, actualiza este documento.

## 1. Qué es

Portal web tipo **cuaderno de apuntes** para aprender React desde cero:

- **29 temas** en orden de estudio, cada uno con: ¿Qué es? · ¿Para qué sirve? · ¿Cómo se utiliza? (código) · **demos en vivo** · errores comunes · claves · preguntas de entrevista relacionadas.
- **77 preguntas de entrevista** traducidas y explicadas en español. Vienen del repo [ReactJs-Interview-Question](https://github.com/TheSharkFullCode/ReactJs-Interview-Question), que tiene 78 numeradas pero no incluye la 28. Algunas están corregidas o actualizadas: las que tienen `nota`.
- **Página de variables**: todas las variables globales, visibles y consultables.
- **Guía de despliegue**: cómo arrancarlo en local y publicarlo en Netlify o Vercel.
- **Progreso** guardado en localStorage: los temas marcados como completados.

Sin base de datos: todo el contenido está en `src/data/`.

## 2. Stack

| Herramienta | Versión | Para qué |
|---|---|---|
| React | 19 | Interfaz |
| Vite | 8 | Servidor de desarrollo y build |
| Tailwind CSS | 4 (`@tailwindcss/vite`) | Estilos. Los tokens están en `src/index.css` (`@theme`) |
| React Router | 7 (`react-router-dom`) | Navegación entre secciones |
| prism-react-renderer | 2 | Resaltado de sintaxis en los bloques de código |

Requisito: **Node.js 20.19+** (recomendado 22 LTS).

## 3. Reglas del proyecto

1. **Cada componente en su archivo, máximo 50 líneas.** Si crece, se divide en subcomponentes. (Los archivos de `src/data/` son datos, no componentes, y pueden ser más largos.)
2. **Todo el contenido vive en `src/data/`**, nunca escrito a mano dentro del JSX.
3. **Toda la configuración vive en `src/config/variables.js`**: colores, categorías, menú, niveles y datos del sitio.
4. Los componentes leen datos y variables con el hook **`useCuaderno()`**, que accede al contexto global.
5. Las clases de Tailwind se escriben **completas**, nunca concatenadas (`'bg-' + color` no funciona).
6. Fondo blanco y colores vivos: `primario` violeta, `rosa`, `cian`, `esmeralda`, `ambar`, `naranja` y `tinta` para el texto.

## 4. Estructura de carpetas

```
cuaderno-react/
├── ARQUITECTURA.md          ← este archivo
├── README.md                ← cómo arrancar y desplegar
├── index.html               ← carga las fuentes (Inter, JetBrains Mono) y main.jsx
├── vite.config.js           ← plugins: react + tailwindcss
├── vercel.json              ← redirección SPA para Vercel
├── public/
│   ├── logo.svg
│   └── _redirects           ← redirección SPA para Netlify
└── src/
    ├── main.jsx             ← BrowserRouter > CuadernoProvider > App
    ├── App.jsx              ← rutas (las páginas se cargan con lazy)
    ├── index.css            ← @import tailwind + @theme (colores) + .hoja + .texto-degradado
    ├── config/
    │   └── variables.js     ← SITIO, COLORES, CATEGORIAS, CATEGORIAS_PREGUNTAS, RUTAS, NIVELES, CLAVE_PROGRESO
    ├── context/
    │   ├── CuadernoContext.jsx  ← Provider global
    │   └── useCuaderno.js       ← hook para consumir el contexto
    ├── hooks/               ← custom hooks reutilizables
    │   ├── useLocalStorage.js   ← useState persistente
    │   ├── useDebounce.js
    │   ├── useCopiar.js         ← copiar al portapapeles
    │   └── useScrollArriba.js   ← vuelve arriba al cambiar de ruta
    ├── layouts/
    │   ├── Layout.jsx       ← Navbar + <Suspense><Outlet/></Suspense> + Footer
    │   ├── Navbar.jsx       ← logo, menú (escritorio y móvil), barra de progreso
    │   ├── EnlacesNav.jsx   ← NavLink generados desde variables.RUTAS
    │   └── Footer.jsx
    ├── pages/               ← una por ruta
    │   ├── InicioPage.jsx         /
    │   ├── TemasPage.jsx          /temas
    │   ├── TemaDetallePage.jsx    /temas/:id
    │   ├── PreguntasPage.jsx      /preguntas   (?n=34 abre la pregunta 34)
    │   ├── VariablesPage.jsx      /variables
    │   ├── DesplieguePage.jsx     /despliegue
    │   └── NoEncontradaPage.jsx   *
    ├── components/
    │   ├── ui/              ← piezas genéricas: Boton, Etiqueta, Buscador, Nota, BloqueCodigo,
    │   │                       BotonCopiar, CajaDemo, TituloPagina, BarraProgreso, Cargando
    │   ├── inicio/          ← Hero, TarjetaFlotante, Estadisticas, ComoEstudiar, RutaAprendizaje
    │   ├── temas/           ← índice: FiltroCategorias, GridTemas, TarjetaTema
    │   ├── tema/            ← detalle: CabeceraTema, TeoriaTema, SeccionesTema, DemosTema,
    │   │                       DemoConCodigo, ResumenTema, PreguntasRelacionadas, NavegacionTema, TituloBloque
    │   ├── preguntas/       ← FiltroPreguntas, ListaPreguntas, ItemPregunta, RespuestaPregunta
    │   ├── variables/       ← PaletaColores, TablaCategorias, VariablesSitio, ComoUsarVariables
    │   ├── despliegue/      ← TarjetaPaso
    │   └── demos/           ← 26 demos interactivas + index.js (registro)
    └── data/
        ├── temas/           ← fundamentos.js, interfaz.js, arrays.js, hooks.js, avanzado.js
        │   └── index.js     ← ORDEN de estudio + exporta TEMAS (con numero)
        ├── preguntas/       ← preguntas1-4.js + index.js (exporta PREGUNTAS)
        └── despliegue.js    ← pasos de la guía de despliegue
```

## 5. Flujo de datos

```
config/variables.js ─┐
data/temas  ─────────┼──► CuadernoContext (Provider en main.jsx)
data/preguntas ──────┘        │  temas, preguntas, variables,
                              │  busqueda/setBusqueda,
useLocalStorage ─────────────►│  completados/toggleCompletado, progreso
                              ▼
                     useCuaderno() en cualquier componente
```

- La **búsqueda de temas** está en el contexto: se mantiene al cambiar de página.
- La **búsqueda y el filtro de preguntas** son estado local de `PreguntasPage`.
- El **progreso** se guarda en localStorage con la clave `CLAVE_PROGRESO`.

## 6. Formato de un tema (`src/data/temas/*.js`)

```js
{
  id: 'use-state',                 // se usa en la URL: /temas/use-state
  titulo: 'useState',
  categoria: 'hooks',              // clave de variables.CATEGORIAS
  nivel: 'basico',                 // clave de variables.NIVELES
  icono: '🔢',
  resumen: 'Una frase',
  queEs: 'Párrafo de teoría',
  paraQue: ['punto', 'punto'],
  secciones: [{ titulo, texto?, codigo, lenguaje? }],  // lenguaje: 'jsx' (por defecto), 'bash', 'css', 'json'
  demos: ['ContadorDemo'],         // nombres en components/demos/index.js (opcional)
  errores: ['...'],
  claves: ['...'],
  preguntas: [7, 34],              // números de preguntas relacionadas
}
```

**Añadir un tema:** créalo en el archivo de su categoría y añade su `id` al array `ORDEN` de `data/temas/index.js`.

⚠️ El código va dentro de template literals: escapa `` \` `` y `\${` cuando aparezcan dentro del ejemplo.

## 7. Formato de una pregunta (`src/data/preguntas/*.js`)

```js
{ n: 34, categoria: 'Adivina la salida', pregunta: '...', respuesta: '...',
  puntos?: ['...'], codigo?: '...', nota?: 'Corrección o actualización' }
```

Categorías válidas: las de `variables.CATEGORIAS_PREGUNTAS`.

## 8. Demos en vivo

- Cada demo es un componente de 50 líneas como máximo en `components/demos/NombreDemo.jsx`.
- `components/demos/index.js` las registra e importa su código fuente con `?raw` (función de Vite). Así, el botón “Ver código” muestra **exactamente** el archivo que se ejecuta.
- **Añadir una demo:** crea el archivo, regístralo en `index.js` (import normal + import `?raw` + entrada en `DEMOS`) y pon su nombre en `demos: []` del tema.

## 9. Scripts

```bash
npm install       # dependencias
npm run dev       # desarrollo → http://localhost:5173
npm run build     # producción → dist/
npm run preview   # probar dist/ → http://localhost:4173
```

## 10. Despliegue

- **Netlify:** build `npm run build`, carpeta `dist`. `public/_redirects` ya incluye la redirección de la SPA.
- **Vercel:** detecta Vite solo. `vercel.json` ya incluye la redirección.
- Sin esas redirecciones, recargar en `/temas/use-state` daría un error 404 en el servidor.

## 11. Ideas para mejorar

- Modo oscuro (un hook `useModoOscuro` y la variante `dark:` de Tailwind).
- Editor de código editable (Sandpack o react-live) para modificar las demos en vivo.
- Pasar el proyecto a TypeScript.
- Tests con Vitest y React Testing Library.
