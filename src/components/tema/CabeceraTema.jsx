import { Link } from 'react-router-dom'
import useCuaderno from '../../context/useCuaderno'
import Etiqueta from '../ui/Etiqueta'

// Cabecera del tema: migas de pan, icono, título y etiquetas
export default function CabeceraTema({ tema }) {
  const { variables, temas } = useCuaderno()
  const cat = variables.CATEGORIAS[tema.categoria]
  const nivel = variables.NIVELES[tema.nivel]

  return (
    <header className="animate-aparecer">
      <nav className="mb-6 text-sm font-semibold text-tinta/50">
        <Link to="/temas" className="hover:text-primario">Temas</Link> / <span className={cat.texto}>{cat.nombre}</span>
      </nav>
      <div className="flex items-center gap-4">
        <span className={`grid h-16 w-16 shrink-0 place-items-center rounded-3xl text-4xl ${cat.suave}`}>{tema.icono}</span>
        <div>
          <p className="text-sm font-bold text-tinta/40">Tema {tema.numero} de {temas.length}</p>
          <h1 className="text-4xl font-extrabold sm:text-5xl">{tema.titulo}</h1>
        </div>
      </div>
      <p className="mt-4 text-xl text-tinta/70">{tema.resumen}</p>
      <div className="mt-4 flex gap-2">
        <Etiqueta className={`${cat.fondo} text-white`}>{cat.icono} {cat.nombre}</Etiqueta>
        <Etiqueta className={nivel.clase}>{nivel.texto}</Etiqueta>
      </div>
    </header>
  )
}
