/* ROUTER */
import {
  Routes,
  Route
} from "react-router-dom";

/* PAGES */
import AdminPage from "./pages/AdminPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import UserPage from "./pages/UserPage";
import HomePage from "./pages/HomePage";

/* REACT */
import {
  useEffect,
  useContext
} from "react";

/* CONTEXT */
import { AuthContext } from "./context/AuthContext";

/* HOOKS */
import { useTickets } from "./hooks/useTickets";
import { useAdmin } from "./hooks/useAdmin";

/* PROTECTED ROUTES */
import ProtectedRoute from "./components/ProtectedRoute";

function App() {

  // TICKETS
  const {
    tickets,
    voirTicket,
    ajoutTicket,
    voirToutTicket,
    supprimerTicket,
    modifierTickets
  } = useTickets();

  // ADMIN
  const {
    users,
    supprimerUser,
    deleteAll,
    voirToutUser
  } = useAdmin();

  // AUTH
  const {

    role,
    setRole,

    email,
    setEmail,

    password,
    setPassword,

    username,
    setUsername,

    handleLogout,
    handleSubmit,
    handleRegister

  } = useContext(AuthContext);

  // AUTO LOGIN
  useEffect(() => {

    if (localStorage.getItem("token")) {

      const roleStorage = localStorage.getItem("role");

      setRole(roleStorage);

      if (roleStorage === "admin") {

        voirToutTicket();
        voirToutUser();

      } else {

        voirTicket();
      }
    }

  }, []);

  return (

    <div>

      <h1>Mon application tickets</h1>

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
            <RegisterPage
              username={username}
              setUsername={setUsername}

              email={email}
              setEmail={setEmail}

              password={password}
              setPassword={setPassword}

              handleRegister={handleRegister}
            />
          }
        />

        {/* LOGIN */}
        <Route
          path="/login"
          element={
            <LoginPage
              email={email}
              setEmail={setEmail}

              password={password}
              setPassword={setPassword}

              handleSubmit={handleSubmit}
            />
          }
        />

        {/* USER DASHBOARD */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute allowedRole="user">

              <UserPage
                tickets={tickets}

                supprimerTicket={supprimerTicket}

                modifierTickets={modifierTickets}

                ajoutTicket={ajoutTicket}

                handleLogout={handleLogout}
              />

            </ProtectedRoute>
          }
        />

        {/* ADMIN DASHBOARD */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRole="admin">

              <AdminPage
                tickets={tickets}

                supprimerTicket={supprimerTicket}

                modifierTickets={modifierTickets}

                users={users}

                deleteAll={deleteAll}

                handleLogout={handleLogout}

                supprimerUser={supprimerUser}
              />

            </ProtectedRoute>
          }
        />

      </Routes>

    </div>
  );
}

export default App;