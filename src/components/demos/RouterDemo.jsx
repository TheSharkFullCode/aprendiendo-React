import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'

// Hooks de React Router usados en ESTA misma página
export default function RouterDemo() {
  const { id } = useParams() // parámetro dinámico de /temas/:id
  const { pathname } = useLocation() // ruta actual
  const navigate = useNavigate() // navegar desde código

  return (
    <div className="space-y-3">
      <ul className="space-y-1 font-mono text-sm">
        <li>useLocation().pathname → <strong className="text-esmeralda">{pathname}</strong></li>
        <li>useParams().id → <strong className="text-esmeralda">{id}</strong></li>
      </ul>
      <div className="flex flex-wrap gap-2">
        <Link to="/temas" className="rounded-lg bg-esmeralda/10 px-3 py-1.5 text-esmeralda">
          &lt;Link to="/temas"&gt;
        </Link>
        <button onClick={() => navigate('/temas/use-state')} className="rounded-lg bg-esmeralda px-3 py-1.5 text-white">
          navigate('/temas/use-state')
        </button>
        <button onClick={() => navigate(-1)} className="rounded-lg bg-tinta/10 px-3 py-1.5">
          navigate(-1) ← atrás
        </button>
      </div>
    </div>
  )
}
