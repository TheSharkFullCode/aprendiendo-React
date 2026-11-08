import { useState } from 'react'

const INICIAL = { nombre: '', email: '', clave: '' }

// Formulario controlado: un único objeto de estado + un único handleChange
export default function FormularioDemo() {
  const [datos, setDatos] = useState(INICIAL)
  const [enviado, setEnviado] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setDatos({ ...datos, [name]: value }) // [name] = propiedad dinámica
  }

  const errores = {
    nombre: datos.nombre && !/^[a-zA-ZáéíóúñÑ ]+$/.test(datos.nombre) ? 'Solo letras' : '',
    email: datos.email && !/\S+@\S+\.\S+/.test(datos.email) ? 'Email no válido' : '',
    clave: datos.clave && datos.clave.length < 8 ? 'Mínimo 8 caracteres' : '',
  }
  const valido = Object.values(datos).every(Boolean) && !Object.values(errores).some(Boolean)

  const enviar = (e) => {
    e.preventDefault() // evita que la página se recargue
    setEnviado(datos.nombre)
    setDatos(INICIAL)
  }

  return (
    <form onSubmit={enviar} className="space-y-2">
      {Object.keys(INICIAL).map((campo) => (
        <div key={campo}>
          <input
            name={campo}
            type={campo === 'clave' ? 'password' : 'text'}
            value={datos[campo]}
            onChange={handleChange}
            placeholder={campo}
            className={`w-full rounded-lg border px-3 py-1.5 capitalize ${errores[campo] ? 'border-rosa' : ''}`}
          />
          {errores[campo] && <p className="text-xs text-rosa">{errores[campo]}</p>}
        </div>
      ))}
      <button disabled={!valido} className="w-full rounded-lg bg-primario py-2 font-bold text-white disabled:opacity-40">
        Registrarme
      </button>
      {enviado && <p className="text-esmeralda">✅ ¡Registro completado, {enviado}!</p>}
    </form>
  )
}
