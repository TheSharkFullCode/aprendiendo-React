import { useState } from 'react'
import useCuaderno from '../context/useCuaderno'
import TituloPagina from '../components/ui/TituloPagina'
import Buscador from '../components/ui/Buscador'
import FiltroCategorias from '../components/temas/FiltroCategorias'
import GridTemas from '../components/temas/GridTemas'

// Índice de temas con búsqueda (en el contexto) y filtro por categoría
export default function TemasPage() {
  const { temas, busqueda, setBusqueda } = useCuaderno()
  const [categoria, setCategoria] = useState('todas')

  const texto = busqueda.toLowerCase()
  const visibles = temas
    .filter((t) => categoria === 'todas' || t.categoria === categoria)
    .filter((t) => `${t.titulo} ${t.resumen} ${t.queEs}`.toLowerCase().includes(texto))

  return (
    <>
      <TituloPagina
        antetitulo="Índice del cuaderno"
        titulo="Temas de React"
        descripcion="Desde qué es React hasta Redux. Cada tema tiene teoría, código y ejemplos en vivo."
      />
      <div className="mb-8 space-y-4">
        <Buscador valor={busqueda} alCambiar={setBusqueda} placeholder="Busca: useEffect, map, formulario..." />
        <FiltroCategorias activa={categoria} alCambiar={setCategoria} />
      </div>
      <GridTemas temas={visibles} />
    </>
  )
}
