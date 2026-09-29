import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource-variable/sora'
import '@fontsource-variable/dm-sans'
import '@fontsource/space-mono/latin-400.css'
import '@fontsource/space-mono/latin-700.css'
import App from './Experience'
import './experience.css'

createRoot(document.getElementById('root')!).render(<StrictMode><App/></StrictMode>)
