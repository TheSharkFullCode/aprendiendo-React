// Lista anidada con un componente RECURSIVO (se llama a sí mismo)
const datos = [
  { nombre: 'src', hijos: [
    { nombre: 'components', hijos: [{ nombre: 'Navbar.jsx', hijos: [] }, { nombre: 'Footer.jsx', hijos: [] }] },
    { nombre: 'pages', hijos: [{ nombre: 'Inicio.jsx', hijos: [] }] },
    { nombre: 'App.jsx', hijos: [] },
  ] },
  { nombre: 'package.json', hijos: [] },
]

function Arbol({ nodos }) {
  return (
    <ul className="ml-4 border-l-2 border-cian/30 pl-3">
      {nodos.map((n) => (
        <li key={n.nombre} className="py-0.5">
          {n.hijos.length ? '📁' : '📄'} {n.nombre}
          {n.hijos.length > 0 && <Arbol nodos={n.hijos} />}
        </li>
      ))}
    </ul>
  )
}

export default function ListaAnidadaDemo() {
  return <div className="font-mono text-sm"><Arbol nodos={datos} /></div>
}
