import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import useCuaderno from '../context/useCuaderno'
import TituloPagina from '../components/ui/TituloPagina'
import Buscador from '../components/ui/Buscador'
import FiltroPreguntas from '../components/preguntas/FiltroPreguntas'
import ListaPreguntas from '../components/preguntas/ListaPreguntas'

// Preguntas de entrevista traducidas. ?n=34 abre directamente la pregunta 34.
export default function PreguntasPage() {
  const { preguntas, variables } = useCuaderno()
  const [params] = useSearchParams()
  const [texto, setTexto] = useState('')
  const [categoria, setCategoria] = useState('Todas')

  const visibles = preguntas
    .filter((p) => categoria === 'Todas' || p.categoria === categoria)
    .filter((p) => `${p.n} ${p.pregunta} ${p.respuesta}`.toLowerCase().includes(texto.toLowerCase()))

  return (
    <>
      <TituloPagina
        antetitulo="Preparación de entrevistas"
        titulo={`${preguntas.length} preguntas de React`}
        descripcion="Traducidas al español y explicadas de forma sencilla. Las respuestas con 💡 incluyen correcciones o actualizaciones respecto al repositorio original."
      />
      <div className="mb-8 space-y-4">
        <Buscador valor={texto} alCambiar={setTexto} placeholder="Busca: batching, useRef, Redux, 34..." />
        <FiltroPreguntas categorias={variables.CATEGORIAS_PREGUNTAS} activa={categoria} alCambiar={setCategoria} />
      </div>
      <ListaPreguntas preguntas={visibles} abiertaInicial={Number(params.get('n'))} />
      <p className="mt-8 text-center text-sm text-tinta/50">
        Fuente original (en inglés):{' '}
        <a href={variables.SITIO.repoPreguntas} target="_blank" rel="noreferrer" className="font-semibold text-primario">
          ReactJs-Interview-Question ↗
        </a>
      </p>
    </>
  )
}
