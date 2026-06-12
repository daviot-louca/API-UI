import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/auth/AuthProvider.jsx";
import { TicketProvider } from "./context/ticket/TicketProvider.jsx";
import { CategoryProvider } from "./context/categories/CategoriesProvider.jsx";
import { AdminProvider } from "./context/admin/AdminProvider.jsx";
import { ActivitesProvider } from "./context/activites/activitesProvider.jsx";
import { ConnaissancesProvider } from "./context/baseConnaisssance/ConnaissancesProvider.jsx";
import App from "./App.jsx";
import "./index.css";
import { Toaster } from "sonner";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter basename="/NovaDesk">
      <AuthProvider>
        <TicketProvider>
          <AdminProvider>
            <CategoryProvider>
              <ActivitesProvider>
                <ConnaissancesProvider>
                  <App />
                  <Toaster richColors position="top-center" />
                </ConnaissancesProvider>
              </ActivitesProvider>
            </CategoryProvider>
          </AdminProvider>
        </TicketProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
);
