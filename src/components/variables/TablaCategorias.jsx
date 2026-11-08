import useCuaderno from '../../context/useCuaderno'

// Tabla de variables.CATEGORIAS y variables.NIVELES
export default function TablaCategorias() {
  const { variables, temas } = useCuaderno()

  return (
    <section className="grid gap-6 lg:grid-cols-3">
      <div className="overflow-x-auto rounded-3xl bg-white p-6 shadow-sm lg:col-span-2">
        <h2 className="mb-4 text-2xl font-extrabold">🗂️ CATEGORIAS</h2>
        <table className="w-full text-left text-sm">
          <thead className="text-tinta/50">
            <tr><th className="pb-2">Clave</th><th>Nombre</th><th>Clases</th><th>Temas</th></tr>
          </thead>
          <tbody>
            {Object.entries(variables.CATEGORIAS).map(([clave, c]) => (
              <tr key={clave} className="border-t border-tinta/5">
                <td className="py-3 font-mono">{clave}</td>
                <td className={`font-bold ${c.texto}`}>{c.icono} {c.nombre}</td>
                <td><span className={`inline-block h-5 w-5 rounded-full align-middle ${c.fondo}`} /> <code className="text-xs">{c.fondo}</code></td>
                <td>{temas.filter((t) => t.categoria === clave).length}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="rounded-3xl bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-2xl font-extrabold">📶 NIVELES</h2>
        <ul className="space-y-3">
          {Object.entries(variables.NIVELES).map(([clave, n]) => (
            <li key={clave} className="flex items-center justify-between">
              <code className="text-sm">{clave}</code>
              <span className={`rounded-full px-3 py-1 text-xs font-bold ${n.clase}`}>{n.texto}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
