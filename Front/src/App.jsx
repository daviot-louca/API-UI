/* ROUTER */
import { Routes, Route } from "react-router-dom";

/* PAGES ADMIN*/
import AdminPageTickets from "./pages/admin/AdminPageTickets";
import AdminPageUsers from "./pages/admin/AdminPageUsers";
import AdminPageDashboard from "./pages/admin/AdminPageDashboard";
import AdminPageCategories from "./pages/admin/AdminPageCategories";
import AdminPageMessagerie from "./pages/admin/AdminPageMessagerie";
import AdminPageListeMessages from "./pages/admin/AdminPageListeMessages";
/* PAGES SHARED*/
import LoginPage from "./pages/shared/LoginPage";
import RegisterPage from "./pages/shared/RegisterPage";
import HomePage from "./pages/shared/HomePage";

/* PAGES USER*/
import UserPage from "./pages/user/UserPage";
import Message from "./pages/user/Message";
import TicketPage from "./pages/user/TicketPage";
import FAQ from "./pages/user/FAQ";
import ListeMessages from "./pages/user/ListeMessages"

/* PROTECTED ROUTES */
import ProtectedRoute from "./components/shared/ProtectedRoute";

function App() {
  return (
    <div>
      <Routes>
        {/* HOME */}
        <Route path="/" element={<HomePage />} />

        {/* REGISTER */}
        <Route path="/register" element={<RegisterPage />} />

        {/* LOGIN */}
        <Route path="/login" element={<LoginPage />} />

        {/* ADMIN ROUTES */}
        <Route
          path="/admin/ticket"
          element={
            <ProtectedRoute allowedRole="administrateur">
              <AdminPageTickets />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <ProtectedRoute allowedRole="administrateur">
              <AdminPageUsers />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute allowedRole="administrateur">
              <AdminPageDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/messagerie/:ticketId"
          element={
            <ProtectedRoute allowedRole="administrateur">
              {console.log("admin page")}
              <AdminPageMessagerie />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/messagerie"
          element={
            <ProtectedRoute allowedRole="administrateur">
              <AdminPageListeMessages />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/categories"
          element={
            <ProtectedRoute allowedRole="administrateur">
              <AdminPageCategories />
            </ProtectedRoute>
          }
        />

        {/* USER ROUTES */}
        <Route
          path="/user/dashboard"
          element={
            <ProtectedRoute allowedRole="utilisateur">
              <UserPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/tickets"
          element={
            <ProtectedRoute allowedRole="utilisateur">
              <TicketPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/message"
          element={
            <ProtectedRoute allowedRole="utilisateur">
              <ListeMessages />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/message/:ticketId"
          element={
            <ProtectedRoute allowedRole="utilisateur">
              <Message />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/faq"
          element={
            <ProtectedRoute allowedRole="utilisateur">
              <FAQ />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
