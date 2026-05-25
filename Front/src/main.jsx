import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom"
import { AuthProvider } from './context/auth/AuthProvider.jsx'
import { TicketProvider } from './context/ticket/TicketProvider.jsx'
import App from './App.jsx'
import { AdminProvider } from './context/admin/AdminProvider.jsx'
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
