import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/auth/AuthProvider.jsx";
import { TicketProvider } from "./context/ticket/TicketProvider.jsx";
import { CategoryProvider } from "./context/categories/CategoriesProvider.jsx";
import App from "./App.jsx";
import { AdminProvider } from "./context/admin/AdminProvider.jsx";
import "./index.css";
import { ActivitesProvider } from "./context/activites/activitesProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <TicketProvider>
          <AdminProvider>
            <CategoryProvider>
              <ActivitesProvider>
                <App />
              </ActivitesProvider>
            </CategoryProvider>
          </AdminProvider>
        </TicketProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
);
