// Cabecera de cada página: etiqueta pequeña + título con degradado + descripción
export default function TituloPagina({ antetitulo, titulo, descripcion }) {
  return (
    <header className="mb-8 animate-aparecer">
      {antetitulo && (
        <p className="mb-2 text-sm font-bold uppercase tracking-widest text-rosa">{antetitulo}</p>
      )}
      <h1 className="texto-degradado text-4xl font-extrabold leading-tight sm:text-5xl">{titulo}</h1>
      {descripcion && <p className="mt-3 max-w-2xl text-lg text-tinta/70">{descripcion}</p>}
    </header>
  )
}
