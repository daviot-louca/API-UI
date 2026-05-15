/* ROUTER */
import {
  Routes,
  Route
} from "react-router-dom";

/* PAGES */
import AdminPageTickets from "./pages/AdminPageTickets";
import AdminPageUsers from "./pages/AdminPageUsers";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import UserPage from "./pages/UserPage";
import HomePage from "./pages/HomePage";
/* PROTECTED ROUTES */
import ProtectedRoute from "./components/protectedRoute";

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
      </Routes>
    </div>
  );
}

export default App;