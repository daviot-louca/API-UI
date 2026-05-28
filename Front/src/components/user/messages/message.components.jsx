import { useContext, useState, useEffect } from "react";
import { io } from "socket.io-client";
import DashboardLayoutUser from "../layout/DashboardLayoutUser";
import ProfilModal from "../../shared/modals/ProfilModal";
import { AuthContext } from "../../../context/auth/AuthContext";
const socket = io("http://localhost:3030");
export default function MessageComponents() {
  const {
    handleLogout,
    username,
    role,
    avatar,
    email,
    setUsername,
    setEmail,
    id,
  } = useContext(AuthContext);

  useEffect(() => {
    //emit sert à envoyer
    socket.emit("join_ticket", ticketId);
    //on sert à recevoir
    socket.on("receive_message", (data) => {
      setMessages(prev => [...prev,data])
    });
    return ()=>{
        socket.off("receive_message")
    }
  }, []);
  const ticketId = 2;
  const userId = 2;
  const [message, setMessage] = useState("");
  const [messages,setMessages] = useState([])
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  return (
    <DashboardLayoutUser
      username={username}
      handleLogout={handleLogout}
      role={role}
      avatar={avatar}
      email={email}
      setUsername={setUsername}
      setEmail={setEmail}
      setIsProfileModalOpen={setIsProfileModalOpen}
    >
        <div>
            {messages.map((msg)=>(
                <div key={msg.id}>
                    <p>{msg.message}</p>
                </div>
            ))}
        </div>
        <form
          action=""
          onSubmit={(e) => {
            e.preventDefault()
            socket.emit("send_message", ticketId, message, userId)
          }}
        >
          <input type="text" onChange={(e) => setMessage(e.target.value)} />
          <button type="submit">essaie</button>
        </form>

      {isProfileModalOpen && (
        <ProfilModal
          avatar={avatar}
          username={username}
          email={email}
          setUsername={setUsername}
          setEmail={setEmail}
          setIsProfileModalOpen={setIsProfileModalOpen}
        />
      )}
    </DashboardLayoutUser>
  );
}
