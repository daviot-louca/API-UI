/* SERVICES */
import {
  voirToutUsers,
  deleteAllService,
  supprimerUserService
} from "./services/admin.service";

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
  useState,
  useContext
} from "react";

/* CONTEXT */
import { AuthContext } from "./context/AuthContext";

/* HOOKS */
import { useTickets } from "./hooks/useTickets";

function App() {

  // TICKETS HOOK
  const {
    tickets,
    voirTicket,
    ajoutTicket,
    voirToutTicket,
    supprimerTicket,
    modifierTickets
  } = useTickets();

  // AUTH CONTEXT
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

  // LOCAL STATES
  const [titre, setTitre] = useState("");
  const [description, setDescription] = useState("");
  const [users, setUsers] = useState([]);

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

  // AJOUT TICKET
  const handleAjoutTicket = async (e) => {

    e.preventDefault();

    await ajoutTicket(
      titre,
      description
    );

    setTitre("");
    setDescription("");
  };

  // VOIR TOUS LES USERS
  const voirToutUser = async () => {

    try {

      const token = localStorage.getItem("token");

      const data = await voirToutUsers(token);

      setUsers(data);

    } catch (error) {

      console.log(error);
    }
  };

  // SUPPRIMER USER
  const supprimerUser = async (id) => {

    try {

      const token = localStorage.getItem("token");

      await supprimerUserService(
        id,
        token
      );

      voirToutUser();

    } catch (error) {

      console.log(error);
    }
  };

  // DELETE ALL USERS
  const deleteAll = async () => {

    try {

      const token = localStorage.getItem("token");

      await deleteAllService(token);

      voirToutUser();

    } catch (error) {

      console.log(error);
    }
  };

  return (

    <div>

      <h1>Mon application tickets</h1>

      <Routes>

        <Route
          path="/"
          element={<HomePage />}
        />

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

        <Route
          path="/login"
          element={
            <LoginPage
              email={email}
              password={password}
              setEmail={setEmail}
              setPassword={setPassword}
              handleSubmit={handleSubmit}
            />
          }
        />

        <Route
          path="/dashboard"
          element={
            role === "user"

              ? (

                <UserPage
                  tickets={tickets}
                  supprimerTicket={supprimerTicket}
                  modifierTickets={modifierTickets}

                  titre={titre}
                  setTitre={setTitre}

                  description={description}
                  setDescription={setDescription}

                  ajoutTicket={handleAjoutTicket}

                  handleLogout={handleLogout}
                />

              )

              : (

                <LoginPage
                  email={email}
                  password={password}
                  setEmail={setEmail}
                  setPassword={setPassword}
                  handleSubmit={handleSubmit}
                />

              )
          }
        />

        <Route
          path="/admin"
          element={
            role === "admin"

              ? (

                <AdminPage
                  tickets={tickets}
                  supprimerTicket={supprimerTicket}
                  modifierTickets={modifierTickets}

                  users={users}

                  deleteAll={deleteAll}

                  handleLogout={handleLogout}

                  supprimerUser={supprimerUser}
                />

              )

              : (

                <LoginPage
                  email={email}
                  password={password}
                  setEmail={setEmail}
                  setPassword={setPassword}
                  handleSubmit={handleSubmit}
                />

              )
          }
        />
      </Routes>
    </div>
  );
}

export default App;