/* ROUTER */
import {
  Routes,
  Route
} from "react-router-dom";

/* PAGES ADMIN*/
import AdminPageTickets from "./pages/admin/AdminPageTickets";
import AdminPageUsers from "./pages/admin/AdminPageUsers";
import AdminPageReports from "./pages/admin/AdminPageReports";

/* PAGES SHARED*/
import LoginPage from "./pages/shared/LoginPage";
import RegisterPage from "./pages/shared/RegisterPage";
import HomePage from "./pages/shared/HomePage";

/* PAGES USER*/
import UserPage from "./pages/user/UserPage";
import Message from "./pages/user/Message"
import TicketPage from "./pages/user/TicketPage";
import FAQ from "./pages/user/FAQ";

/* PROTECTED ROUTES */
import ProtectedRoute from "./components/shared/ProtectedRoute";

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

        {/* ADMIN ROUTES */}
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
          path="/admin/reports"
          element={
            <ProtectedRoute allowedRole="admin">
              <AdminPageReports />
            </ProtectedRoute>
          }
        />

        {/* USER ROUTES */}
        <Route
          path="/user/dashboard"
          element={
            <ProtectedRoute allowedRole="user">
              <UserPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/tickets"
          element={
            <ProtectedRoute allowedRole="user">
              <TicketPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/message"
          element={
            <ProtectedRoute allowedRole="user">
              <Message />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/faq"
          element={
            <ProtectedRoute allowedRole="user">
              <FAQ />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
