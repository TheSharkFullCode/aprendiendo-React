// Pastilla pequeña de texto (categoría, nivel, etc.)
export default function Etiqueta({ className = 'bg-primario/10 text-primario', children }) {
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-bold ${className}`}>
      {children}
    </span>
  )
}
