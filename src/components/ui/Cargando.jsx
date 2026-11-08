// Indicador mientras se descarga una página (fallback de Suspense)
export default function Cargando() {
  return (
    <div className="flex justify-center py-24">
      <span className="h-12 w-12 animate-spin rounded-full border-4 border-primario/20 border-t-primario" />
    </div>
  )
}
