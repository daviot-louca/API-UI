import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom"
import { AuthProvider } from './context/AuthContext.jsx'
import { TicketProvider } from './context/TicketContext.jsx'
import App from './App.jsx'
import { AdminProvider } from './context/AdminContext.jsx'
import "./index.css"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <TicketProvider>
          <AdminProvider>
            <App />
          </AdminProvider>
        </TicketProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
