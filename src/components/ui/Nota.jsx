// Caja de aviso tipo "post-it" para consejos, errores comunes, etc.
const TIPOS = {
  consejo: { icono: '💡', clase: 'border-ambar bg-ambar/10' },
  error: { icono: '⚠️', clase: 'border-rosa bg-rosa/10' },
  info: { icono: 'ℹ️', clase: 'border-cian bg-cian/10' },
  exito: { icono: '✅', clase: 'border-esmeralda bg-esmeralda/10' },
}

export default function Nota({ tipo = 'consejo', titulo, children }) {
  const { icono, clase } = TIPOS[tipo]
  return (
    <div className={`rounded-2xl border-l-4 p-4 ${clase}`}>
      {titulo && <p className="mb-1 font-bold">{icono} {titulo}</p>}
      <div className="text-sm leading-relaxed text-tinta/80">
        {!titulo && <span className="mr-1">{icono}</span>}
        {children}
      </div>
    </div>
  )
}
