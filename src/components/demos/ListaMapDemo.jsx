// .map() transforma cada elemento del array en JSX. ¡Cada uno necesita una key única!
const frutas = [
  { id: 1, nombre: 'Mango', emoji: '🥭', precio: 2.5 },
  { id: 2, nombre: 'Piña', emoji: '🍍', precio: 3 },
  { id: 3, nombre: 'Fresa', emoji: '🍓', precio: 4.2 },
  { id: 4, nombre: 'Plátano', emoji: '🍌', precio: 1.1 },
]

export default function ListaMapDemo() {
  return (
    <ul className="grid gap-2 sm:grid-cols-2">
      {frutas.map((fruta, indice) => (
        <li key={fruta.id} className="flex items-center justify-between rounded-xl bg-cian/10 px-4 py-2">
          <span>
            <span className="mr-2 text-tinta/40">#{indice + 1}</span>
            {fruta.emoji} {fruta.nombre}
          </span>
          <span className="font-bold text-cian">{fruta.precio.toFixed(2)} €</span>
        </li>
      ))}
    </ul>
  )
}
