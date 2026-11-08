import useCopiar from '../../hooks/useCopiar'

// Botón pequeño que copia el texto recibido
export default function BotonCopiar({ texto }) {
  const { copiado, copiar } = useCopiar()

  return (
    <button
      onClick={() => copiar(texto)}
      className={`rounded-lg px-2.5 py-1 text-xs font-semibold transition ${
        copiado ? 'bg-esmeralda text-white' : 'bg-white/10 text-white/70 hover:bg-white/20'
      }`}
    >
      {copiado ? '✓ Copiado' : '⧉ Copiar'}
    </button>
  )
}
