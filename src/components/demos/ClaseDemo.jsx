import { Component } from 'react'

// Componente de CLASE (estilo antiguo). Hoy se usan funciones + hooks,
// pero lo verás en proyectos viejos y en entrevistas.
export default class ClaseDemo extends Component {
  constructor(props) {
    super(props) // obligatorio antes de usar this
    this.state = { likes: 0, montadoA: '' }
  }

  componentDidMount() {
    // equivale a useEffect(() => {...}, [])
    this.setState({ montadoA: new Date().toLocaleTimeString() })
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.likes !== this.state.likes) console.log('likes:', this.state.likes)
  }

  render() {
    return (
      <div className="space-y-2">
        <p>Montado a las {this.state.montadoA}</p>
        <button
          onClick={() => this.setState({ likes: this.state.likes + 1 })}
          className="rounded-lg bg-esmeralda px-3 py-1.5 text-white"
        >
          ❤️ {this.state.likes} likes
        </button>
      </div>
    )
  }
}
