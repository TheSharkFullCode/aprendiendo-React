import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// Al cambiar de ruta, vuelve arriba de la página
export default function useScrollArriba() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [pathname])
}
