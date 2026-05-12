/*Tout  */
import LoginForm from "./components/LoginForm";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {

  const url = "http://localhost:3030";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [tickets, setTickets] = useState([]);
  const [role, setRole] = useState("");
  const [titre, setTitre] = useState("");
  const [description, setDescription] = useState("");
  const [users, setUsers] = useState([]);
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (localStorage.getItem("token")) {
      const roleStorage = localStorage.getItem("role")
      setRole(roleStorage)
      if (roleStorage === "admin") {
        voirToutTicket();
        voirToutUser();
      } else {
        voirTicket();
      }
    }
  }, [])

  // PARTIE AJOUTER
  const handleRegister = async (e) => {
    try {

      e.preventDefault();

      // REGISTER
      await axios.post(`${url}/register`, {
        username,
        email,
        password
      });

      const login = await axios.post(`${url}/login`, {
        email,
        password
      });

      localStorage.setItem("token", login.data.token);
      localStorage.setItem("role", login.data.role);

      setRole(login.data.role);

      if (login.data.role === "admin") {
        voirToutTicket();
        voirToutUser();
      } else {
        voirTicket();
      }

      setEmail("");
      setPassword("");

      console.log("utilisateur créé et connecté");

    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    try {

      e.preventDefault();

      const reponse = await axios.post(`${url}/login`, {
        email,
        password
      });

      localStorage.setItem("token", reponse.data.token);
      localStorage.setItem("role", reponse.data.role);

      setRole(reponse.data.role);

      if (reponse.data.role === "admin") {
        voirToutTicket();
        voirToutUser();
      } else {
        voirTicket();
      }

      setEmail("");
      setPassword("");

    } catch (error) {
      console.log(error);
    }
  };

  const ajoutTicket = async (e) => {
    try {
      e.preventDefault();
      const token = localStorage.getItem("token");
      if (titre.trim().length === 0) {
        alert("veuillez mettre un titre")
        return
      }
      if (description.trim().length < 10) {
        alert("Veuillez mettre une description d'un minima de 10 caractères")
        return
      }
      const reponse = await axios.post(`${url}/tickets`, {
        title: titre,
        description,
      }, { headers: { Authorization: `Bearer ${token}` } })
      voirTicket();
      setTitre("");
      setDescription("");
    } catch (error) {
      console.log(error)
    }
  }
  // PARTIE VOIR
  // USER TICKETS
  const voirTicket = async () => {
    try {

      const token = localStorage.getItem("token");

      const reponse = await axios.get(`${url}/tickets`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setTickets(reponse.data);

    } catch (error) {
      console.log(error);
    }
  };

  //VOIR TOUS LES TICKETS
  const voirToutTicket = async () => {
    try {

      const token = localStorage.getItem("token");

      const reponse = await axios.get(`${url}/admin/tickets`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setTickets(reponse.data);

    } catch (error) {
      console.log(error);
    }
  };

  //VOIR TOUS LES USERS
  const voirToutUser = async () => {
    try {
      const token = localStorage.getItem("token");
      const reponse = await axios.get(`${url}/admin/users`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setUsers(reponse.data);
    } catch (error) {
      console.log(error);
    }
  };

  //PARTIE SUPPRIMER
  const supprimerTicket = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const reponse = await axios.delete(`${url}/tickets/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      voirToutTicket();
    } catch (error) {
      console.log(error)
    }
  }

  const deleteAll = async () => {
    try {
      const token = localStorage.getItem("token");
      const reponse = await axios.delete(`${url}/delete/users`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      voirToutUser();
    } catch (error) {
      console.log(error)
    }
  }

  // PARTIE MODIFIER

  const modifierTickets = async (id, newstatus) => {
    try {
      const token = localStorage.getItem('token');
      const reponse = await axios.put(`${url}/tickets/${id}`, {
        status: newstatus
      }, { headers: { Authorization: `Bearer ${token}` } })
      voirToutTicket();
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <div>

      <h1>Mon application tickets</h1>

      <RegisterForm
        handleRegister = {handleRegister}
        username = {username}
        setUsername = {setUsername}
        email = {email}
        setEmail = {setEmail}
        password = {password}
        setPassword = {setPassword}
              
      />
      <LoginForm
        email={email}
        password={password}
        setEmail={setEmail}
        setPassword={setPassword}
        handleSubmit={handleSubmit}
      />
      {/*affiche la partie user du site*/}
      {role === "user" && (
        <div>

          <h1>Mes Tickets</h1>
          <div>
            <div>
              <h2>ID</h2>
            </div>
            <div>
              <h2>Titre</h2>
            </div>
            <div>
              <h2>Description</h2>
            </div>
            <div>
              <h2>Status</h2>
            </div>
            <div>
              <h2>Date de création</h2>
            </div>
          </div>
          <div>
            {tickets.map((ticket) => (

              <div key={ticket.id}>
                <div>
                  <p>{ticket.id}</p>
                </div>
                <div>
                  <p>{ticket.title}</p>
                </div>
                <div>
                  <p>{ticket.description}</p>
                </div>
                <div>
                  <button>{ticket.status}</button>
                </div>
                <div>
                  <p>{new Date(ticket.createdAt).toLocaleDateString()}</p>
                </div>

              </div>

            ))}
          </div>
          {/*ajoute les tickets*/}
          <div>
            <form action="" onSubmit={ajoutTicket}>
              <label htmlFor="">
                Définissez le problème
                <input type="text" placeholder="Titre" value={titre} onChange={(e) => setTitre(e.target.value)} />
              </label>
              <label htmlFor="">
                Veuillez précisez le problème
                <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
              </label>
              <button type="submit">Envoyer</button>
            </form>
          </div>
        </div>
      )}
      {/*affiche la partie admin du site*/}
      {role === "admin" && (
        <div>

          <h1>Dashboard Admin</h1>

          <div>
            <div>
              <div>
                <h2>ID</h2>
              </div>
              <div>
                <h2>Titre</h2>
              </div>
              <div>
                <h2>Description</h2>
              </div>
              <div>
                <h2>Utilisateur</h2>
              </div>
              <div>
                <h2>Status</h2>
              </div>
              <div>
                <h2>Date de création</h2>
              </div>
            </div>
            {tickets.map((ticket) => (

              <div key={ticket.id}>
                <div>
                  <p>{ticket.title}</p>
                </div>
                <div>
                  <p>{ticket.description}</p>
                </div>
                <div>
                  <p>{ticket.User?.username}</p>
                </div>
                <div>
                  <select onChange={modifierTickets} value={ticket.status}>{ticket.status}</select>
                </div>
                <div>
                  <p>{new Date(ticket.createdAt).toLocaleDateString()}</p>
                </div>
                <div>
                  <select
                    value={ticket.status}
                    onChange={(e) =>
                      modifierTickets(ticket.id, e.target.value)
                    }
                  >
                    <option value="remis">remis</option>
                    <option value="ouvert">ouvert</option>
                    <option value="en cours">en cours</option>
                    <option value="résolu">résolu</option>
                  </select>
                </div>
              </div>

            ))}
          </div>
          {/*Voir tous les users */}

          <div>
            <div>
              <h2>liste des utilisateurs :</h2>
              <button onClick={deleteAll}>Réinitialiser</button>
            </div>

            {users.map((user) => (
              <div key={user.id}>
                <div>
                  <p>{user.id}</p>
                </div>
                <div>
                  <p>{user.username}</p>
                </div>
                <div>
                  <p>{user.email}</p>
                </div>
                <div>
                  <p>{user.role}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      )}

    </div>
  );
}

export default App;