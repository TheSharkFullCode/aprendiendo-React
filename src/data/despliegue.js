// Pasos para ejecutar y desplegar el proyecto (página /despliegue)

export const PASOS_DESPLIEGUE = [
  {
    id: 'local',
    titulo: '1. Abrirlo en tu VS Code',
    icono: '💻',
    color: 'bg-primario',
    texto: 'Necesitas Node.js 20.19 o superior (recomendado 22 LTS). Comprueba tu versión con node -v.',
    comandos: `# 1. Descomprime el .zip y abre la carpeta en VS Code
cd cuaderno-react

# 2. Instala las dependencias (crea node_modules)
npm install

# 3. Arranca el servidor de desarrollo
npm run dev
# → abre http://localhost:5173`,
  },
  {
    id: 'build',
    titulo: '2. Generar la versión de producción',
    icono: '📦',
    color: 'bg-rosa',
    texto: 'Crea la carpeta dist/ con HTML, CSS y JS optimizados. Esa carpeta es lo que se sube a un servidor.',
    comandos: `npm run build     # genera dist/
npm run preview   # prueba dist/ en http://localhost:4173`,
  },
  {
    id: 'github',
    titulo: '3. Subirlo a GitHub',
    icono: '🐙',
    color: 'bg-tinta',
    texto: 'Crea un repositorio vacío en GitHub (por ejemplo "cuaderno-react") y sube el código.',
    comandos: `git init
git add .
git commit -m "Cuaderno React: primera versión"
git branch -M main
git remote add origin https://github.com/TheSharkFullCode/cuaderno-react.git
git push -u origin main`,
  },
  {
    id: 'netlify',
    titulo: '4a. Desplegar en Netlify (recomendado)',
    icono: '🌐',
    color: 'bg-cian',
    texto: 'En netlify.com → Add new site → Import from GitHub → elige el repo. Build command: npm run build · Publish directory: dist. El archivo public/_redirects ya está incluido para que las rutas funcionen al recargar.',
    comandos: `# Alternativa por terminal
npm install -g netlify-cli
netlify deploy --prod --dir=dist`,
  },
  {
    id: 'vercel',
    titulo: '4b. Desplegar en Vercel',
    icono: '▲',
    color: 'bg-esmeralda',
    texto: 'En vercel.com → Add New → Project → importa el repo. Detecta Vite solo. El archivo vercel.json ya incluye la redirección para React Router.',
    comandos: `npm install -g vercel
vercel --prod`,
  },
]
