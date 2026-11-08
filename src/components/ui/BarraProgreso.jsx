// Barra fina con el % de temas completados
export default function BarraProgreso({ valor }) {
  return (
    <div className="h-1 w-full bg-primario/10" title={`Progreso: ${valor}%`}>
      <div
        className="h-full bg-gradient-to-r from-primario via-rosa to-naranja transition-all duration-700"
        style={{ width: `${valor}%` }}
      />
    </div>
  )
}
