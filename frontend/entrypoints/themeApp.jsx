import 'vite/modulepreload-polyfill'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '@/components/App'
import './themeApp.css'

ReactDOM.createRoot(document.getElementById('root')).render(
 <React.StrictMode>
  <App
   home={home}
   sectionId={sectionId}
  />
 </React.StrictMode>
)
