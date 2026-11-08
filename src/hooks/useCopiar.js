import { useCallback, useState } from 'react'

// Copia un texto al portapapeles y marca "copiado" 1,5 s
export default function useCopiar() {
  const [copiado, setCopiado] = useState(false)

  const copiar = useCallback(async (texto) => {
    try {
      await navigator.clipboard.writeText(texto)
      setCopiado(true)
      setTimeout(() => setCopiado(false), 1500)
    } catch {
      setCopiado(false)
    }
  }, [])

  return { copiado, copiar }
}
