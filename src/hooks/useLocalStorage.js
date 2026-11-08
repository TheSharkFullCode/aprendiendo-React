import { useEffect, useState } from 'react'

// useState que además se guarda en localStorage
export default function useLocalStorage(clave, valorInicial) {
  const [valor, setValor] = useState(() => {
    try {
      const guardado = localStorage.getItem(clave)
      return guardado ? JSON.parse(guardado) : valorInicial
    } catch {
      return valorInicial
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(clave, JSON.stringify(valor))
    } catch {
      /* modo privado o almacenamiento bloqueado: no pasa nada */
    }
  }, [clave, valor])

  return [valor, setValor]
}
