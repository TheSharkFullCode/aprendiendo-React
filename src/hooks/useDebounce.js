import { useEffect, useState } from 'react'

// Devuelve el valor solo cuando deja de cambiar durante "espera" ms
export default function useDebounce(valor, espera = 500) {
  const [valorRetrasado, setValorRetrasado] = useState(valor)

  useEffect(() => {
    const id = setTimeout(() => setValorRetrasado(valor), espera)
    return () => clearTimeout(id)
  }, [valor, espera])

  return valorRetrasado
}
