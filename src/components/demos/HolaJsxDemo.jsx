// JSX: HTML dentro de JavaScript. Entre llaves { } va cualquier expresión JS.
export default function HolaJsxDemo() {
  const nombre = 'Oscar'
  const hora = new Date().getHours()
  const tecnologias = ['React', 'Vite', 'Tailwind']

  return (
    <div className="space-y-2">
      <h3 className="text-2xl font-bold">¡Hola, {nombre}! 👋</h3>
      <p>
        Son las {hora}h, así que es{' '}
        <strong className="text-primario">{hora < 14 ? 'por la mañana' : 'por la tarde'}</strong>.
      </p>
      <p>2 + 3 = {2 + 3}</p>
      <p>Estás aprendiendo: {tecnologias.join(', ')}</p>
      {/* Esto es un comentario dentro de JSX */}
    </div>
  )
}
