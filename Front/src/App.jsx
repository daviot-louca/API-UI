/* ROUTER */
import {
  Routes,
  Route
} from "react-router-dom";

/* PAGES ADMIN*/
import AdminPageTickets from "./pages/admin/AdminPageTickets";
import AdminPageUsers from "./pages/admin/AdminPageUsers";

/* PAGES SHARED*/
import LoginPage from "./pages/shared/LoginPage";
import RegisterPage from "./pages/shared/RegisterPage";
import HomePage from "./pages/shared/HomePage";

/* PAGES USER*/
import UserPage from "./pages/user/UserPage";
import UserDashboardCreateTicket from "./pages/user/UserDashboardCreateTicket"

/* PROTECTED ROUTES */
import ProtectedRoute from "./components/shared/ProtectedRoute";
import AdminPageTicketDetail from "./pages/admin/AdminPageTicketDetail";

function App() {
  return (

    <div>
      <Routes>

        {/* HOME */}
        <Route
          path="/"
          element={<HomePage />}
        />

        {/* REGISTER */}
        <Route
          path="/register"
          element={
            <RegisterPage />
          }
        />

        {/* LOGIN */}
        <Route
          path="/login"
          element={
            <LoginPage />
          }
        />

        {/* USER DASHBOARD */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute allowedRole="user">
              <UserPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/create/Tickets"
          element={
            <ProtectedRoute allowedRole="user">
              <UserDashboardCreateTicket />
            </ProtectedRoute>}
        />

        {/* ADMIN DASHBOARD */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRole="admin">
              <AdminPageTickets />
            </ProtectedRoute>
          }
        />
        <Route
          path="/users"
          element={
            <ProtectedRoute allowedRole="admin">
              <AdminPageUsers />
            </ProtectedRoute>
          }
        />
        <Route
        path="/admin/tickets/:id"
        element={
          <ProtectedRoute allowedRole="admin">
            <AdminPageTicketDetail/>
          </ProtectedRoute>
        }
        />
      </Routes>
    </div>
  );
}

export default App;