// Un componente es una función que devuelve JSX. Se reutiliza como una etiqueta.
function Insignia({ emoji, texto }) {
  return (
    <span className="rounded-full bg-primario/10 px-3 py-1 font-semibold text-primario">
      {emoji} {texto}
    </span>
  )
}

export default function ComponentesDemo() {
  return (
    <div className="flex flex-wrap gap-2">
      <Insignia emoji="⚛️" texto="React" />
      <Insignia emoji="⚡" texto="Vite" />
      <Insignia emoji="🎨" texto="Tailwind" />
      <Insignia emoji="🧭" texto="Router" />
    </div>
  )
}
