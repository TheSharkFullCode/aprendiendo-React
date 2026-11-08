import { lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './layouts/Layout'
import InicioPage from './pages/InicioPage'

// Las páginas se cargan bajo demanda (code splitting con lazy + Suspense en Layout)
const TemasPage = lazy(() => import('./pages/TemasPage'))
const TemaDetallePage = lazy(() => import('./pages/TemaDetallePage'))
const PreguntasPage = lazy(() => import('./pages/PreguntasPage'))
const VariablesPage = lazy(() => import('./pages/VariablesPage'))
const DesplieguePage = lazy(() => import('./pages/DesplieguePage'))
const NoEncontradaPage = lazy(() => import('./pages/NoEncontradaPage'))

// Mapa de rutas de la web (React Router)
export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<InicioPage />} />
        <Route path="temas" element={<TemasPage />} />
        <Route path="temas/:id" element={<TemaDetallePage />} />
        <Route path="preguntas" element={<PreguntasPage />} />
        <Route path="variables" element={<VariablesPage />} />
        <Route path="despliegue" element={<DesplieguePage />} />
        <Route path="*" element={<NoEncontradaPage />} />
      </Route>
    </Routes>
  )
}
