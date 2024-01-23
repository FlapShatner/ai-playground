import 'vite/modulepreload-polyfill'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '@/components/App'
import './themeApp.css'

const app = document.createElement('div')
app.id = 'ext-root'
document.body.appendChild(app)

ReactDOM.createRoot(app).render(
  <React.StrictMode>
    <App home={home} />
  </React.StrictMode>
)
