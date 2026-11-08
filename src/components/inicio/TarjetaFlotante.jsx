import BloqueCodigo from '../ui/BloqueCodigo'

const EJEMPLO = `function Saludo({ nombre }) {
  const [likes, setLikes] = useState(0)

  return (
    <button onClick={() => setLikes(likes + 1)}>
      Hola {nombre}, tienes {likes} ❤️
    </button>
  )
}`

// Bloque de código decorativo de la portada
export default function TarjetaFlotante() {
  return (
    <div className="relative">
      <div className="absolute -inset-4 -z-10 rounded-[2rem] bg-gradient-to-br from-primario/30 via-rosa/20 to-cian/30 blur-2xl" />
      <div className="rotate-1 transition duration-500 hover:rotate-0">
        <BloqueCodigo codigo={EJEMPLO} titulo="Saludo.jsx" />
      </div>
    </div>
  )
}
