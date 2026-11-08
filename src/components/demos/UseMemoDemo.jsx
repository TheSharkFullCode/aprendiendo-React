import { memo, useCallback, useMemo, useState } from 'react'

const numeros = Array.from({ length: 20000 }, (_, i) => i + 1)

// memo: el hijo solo se vuelve a pintar si cambian sus props
const BotonHijo = memo(function BotonHijo({ alPulsar }) {
  console.log('🔁 BotonHijo renderizado')
  return <button onClick={alPulsar} className="rounded-lg bg-rosa px-3 py-1.5 text-white">+1 desde el hijo</button>
})

export default function UseMemoDemo() {
  const [divisor, setDivisor] = useState(7)
  const [clics, setClics] = useState(0)

  // useMemo: recuerda el RESULTADO de un cálculo caro
  const multiplos = useMemo(() => numeros.filter((n) => n % divisor === 0).length, [divisor])

  // useCallback: recuerda la FUNCIÓN para que memo funcione
  const sumar = useCallback(() => setClics((c) => c + 1), [])

  return (
    <div className="space-y-3">
      <label className="flex items-center gap-2">
        Divisor:
        <input type="number" min="1" value={divisor} onChange={(e) => setDivisor(Number(e.target.value) || 1)} className="w-20 rounded-lg border px-2 py-1" />
      </label>
      <p>Hay <strong className="text-rosa">{multiplos}</strong> múltiplos de {divisor} entre 1 y 20.000</p>
      <div className="flex items-center gap-3">
        <BotonHijo alPulsar={sumar} />
        <span>Clics: {clics}</span>
      </div>
      <p className="text-xs text-tinta/60">Abre la consola (F12): el hijo no se repinta al cambiar el divisor.</p>
    </div>
  )
}
