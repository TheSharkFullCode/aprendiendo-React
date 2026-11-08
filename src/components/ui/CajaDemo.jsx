// Marco donde se ejecuta un ejemplo real ("¡Pruébalo!")
export default function CajaDemo({ titulo = 'Pruébalo', children }) {
  return (
    <div className="rounded-2xl border-2 border-dashed border-primario/30 bg-white p-5 shadow-sm">
      <p className="mb-4 flex items-center gap-2 text-sm font-bold text-primario">
        <span className="relative flex h-2.5 w-2.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-esmeralda opacity-75" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-esmeralda" />
        </span>
        {titulo} · en vivo
      </p>
      {children}
    </div>
  )
}
