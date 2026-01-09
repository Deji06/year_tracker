import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Toaster } from 'react-hot-toast'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    <Toaster
      position="top-right"
      reverseOrder={false}
      gutter={8}
      toastOptions={{
        duration: 4000, 
        style: {
          background: '#363636',
          color: '#fff',
          fontSize: '16px',
          maxWidth: '500px',
          padding: '16px',
          borderRadius: '12px',
        },
        success: {
          duration: 2000,
        },
      }}
    />
  </StrictMode>,
)
