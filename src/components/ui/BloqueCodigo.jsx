import { Highlight, themes } from 'prism-react-renderer'
import BotonCopiar from './BotonCopiar'

// Muestra código con colores (resaltado de sintaxis) y botón de copiar
export default function BloqueCodigo({ codigo, titulo = 'jsx', lenguaje = 'jsx' }) {
  const limpio = codigo.trim()

  return (
    <div className="overflow-hidden rounded-2xl border border-tinta/10 bg-[#1e1b4b] shadow-lg">
      <div className="flex items-center justify-between bg-white/5 px-4 py-2">
        <div className="flex items-center gap-1.5">
          <span className="h-3 w-3 rounded-full bg-rosa" />
          <span className="h-3 w-3 rounded-full bg-ambar" />
          <span className="h-3 w-3 rounded-full bg-esmeralda" />
          <span className="ml-3 font-mono text-xs text-white/50">{titulo}</span>
        </div>
        <BotonCopiar texto={limpio} />
      </div>
      <Highlight code={limpio} language={lenguaje} theme={themes.nightOwl}>
        {({ tokens, getLineProps, getTokenProps }) => (
          <pre className="overflow-x-auto p-4 font-mono text-[13px] leading-relaxed">
            {tokens.map((linea, i) => (
              <div key={i} {...getLineProps({ line: linea })}>
                <span className="mr-4 inline-block w-6 select-none text-right text-white/25">{i + 1}</span>
                {linea.map((token, k) => (
                  <span key={k} {...getTokenProps({ token })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </div>
  )
}
