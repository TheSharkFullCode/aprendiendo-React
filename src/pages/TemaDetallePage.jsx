import { useParams } from 'react-router-dom'
import useCuaderno from '../context/useCuaderno'
import CabeceraTema from '../components/tema/CabeceraTema'
import TeoriaTema from '../components/tema/TeoriaTema'
import SeccionesTema from '../components/tema/SeccionesTema'
import DemosTema from '../components/tema/DemosTema'
import ResumenTema from '../components/tema/ResumenTema'
import PreguntasRelacionadas from '../components/tema/PreguntasRelacionadas'
import NavegacionTema from '../components/tema/NavegacionTema'
import NoEncontradaPage from './NoEncontradaPage'

// Página de un tema: /temas/:id
export default function TemaDetallePage() {
  const { id } = useParams()
  const { temas } = useCuaderno()
  const indice = temas.findIndex((t) => t.id === id)
  const tema = temas[indice]

  if (!tema) return <NoEncontradaPage />

  return (
    <article key={tema.id} className="mx-auto max-w-4xl space-y-12">
      <CabeceraTema tema={tema} />
      <TeoriaTema tema={tema} />
      <SeccionesTema secciones={tema.secciones} />
      <DemosTema demos={tema.demos} />
      <ResumenTema errores={tema.errores} claves={tema.claves} />
      <PreguntasRelacionadas numeros={tema.preguntas} />
      <NavegacionTema anterior={temas[indice - 1]} siguiente={temas[indice + 1]} id={tema.id} />
    </article>
  )
}
