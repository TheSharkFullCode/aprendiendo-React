import TituloPagina from '../components/ui/TituloPagina'
import TarjetaPaso from '../components/despliegue/TarjetaPaso'
import Nota from '../components/ui/Nota'
import { PASOS_DESPLIEGUE } from '../data/despliegue'

// Guía para ejecutar el proyecto en local y publicarlo en internet
export default function DesplieguePage() {
  return (
    <>
      <TituloPagina
        antetitulo="De tu VS Code a internet"
        titulo="Cómo ejecutar y desplegar"
        descripcion="Sigue los pasos en orden. En 10 minutos tendrás tu cuaderno online con su propia URL."
      />
      <div className="space-y-6">
        {PASOS_DESPLIEGUE.map((paso) => (
          <TarjetaPaso key={paso.id} paso={paso} />
        ))}
        <Nota tipo="info" titulo="¿Por qué hace falta _redirects / vercel.json?">
          Esta web es una SPA: solo existe index.html y React Router decide qué página mostrar. Si recargas en
          /temas/use-state, el servidor buscaría un archivo que no existe (error 404). Esos archivos le dicen al servidor:
          “para cualquier ruta, devuelve index.html”.
        </Nota>
      </div>
    </>
  )
}
