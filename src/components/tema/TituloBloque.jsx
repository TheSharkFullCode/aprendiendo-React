// Título numerado de cada bloque dentro de un tema
export default function TituloBloque({ icono, children, color = 'bg-primario' }) {
  return (
    <h2 className="mb-4 flex items-center gap-3 text-2xl font-extrabold">
      <span className={`grid h-10 w-10 place-items-center rounded-xl text-xl text-white shadow-md ${color}`}>{icono}</span>
      {children}
    </h2>
  )
}
