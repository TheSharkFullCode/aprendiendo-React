import { useState } from 'react'
import { DEMOS } from '../demos'
import CajaDemo from '../ui/CajaDemo'
import BloqueCodigo from '../ui/BloqueCodigo'
import Boton from '../ui/Boton'

// Una demo en vivo + su código fuente (importado con ?raw)
export default function DemoConCodigo({ nombre }) {
  const [verCodigo, setVerCodigo] = useState(false)
  const demo = DEMOS[nombre]
  if (!demo) return <p className="text-rosa">Demo "{nombre}" no encontrada</p>

  const { Componente, codigo } = demo

  return (
    <div className="space-y-3">
      <CajaDemo titulo={nombre.replace('Demo', '')}>
        <Componente />
      </CajaDemo>
      <Boton variante="suave" onClick={() => setVerCodigo(!verCodigo)}>
        {verCodigo ? '🙈 Ocultar código' : '👀 Ver código'}
      </Boton>
      {verCodigo && <BloqueCodigo codigo={codigo} titulo={`components/demos/${nombre}.jsx`} />}
    </div>
  )
}
