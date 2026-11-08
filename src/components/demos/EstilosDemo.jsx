import { useState } from 'react'

const COLORES = { primario: 'bg-primario', rosa: 'bg-rosa', cian: 'bg-cian', esmeralda: 'bg-esmeralda' }

// Estilos: className dinámica con template literals y style en línea
export default function EstilosDemo() {
  const [color, setColor] = useState('primario')
  const [tamano, setTamano] = useState(24)
  const [redondo, setRedondo] = useState(true)

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {Object.keys(COLORES).map((c) => (
          <button key={c} onClick={() => setColor(c)} className={`h-8 w-8 rounded-full ${COLORES[c]} ${color === c ? 'ring-4 ring-tinta/20' : ''}`} />
        ))}
        <label className="ml-2 flex items-center gap-2 text-sm">
          <input type="checkbox" checked={redondo} onChange={() => setRedondo(!redondo)} /> Redondeado
        </label>
      </div>
      <input type="range" min="14" max="48" value={tamano} onChange={(e) => setTamano(Number(e.target.value))} className="w-full" />
      <div
        className={`p-6 text-center font-bold text-white transition-all ${COLORES[color]} ${redondo ? 'rounded-3xl' : 'rounded-none'}`}
        style={{ fontSize: tamano }}
      >
        ¡Estilos dinámicos!
      </div>
    </div>
  )
}
