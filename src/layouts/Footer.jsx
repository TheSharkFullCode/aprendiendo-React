import useCuaderno from '../context/useCuaderno'

// Pie de página con datos de variables.SITIO
export default function Footer() {
  const { variables } = useCuaderno()
  const { SITIO } = variables

  return (
    <footer className="border-t border-primario/10 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 py-6 text-sm text-tinta/60 sm:flex-row">
        <p>
          <span className="font-bold text-primario">{SITIO.nombre}</span> v{SITIO.version} ·
          hecho con {SITIO.stack.join(' · ')}
        </p>
        <a href={SITIO.github} target="_blank" rel="noreferrer" className="font-semibold hover:text-primario">
          @{SITIO.autor} ↗
        </a>
      </div>
    </footer>
  )
}
