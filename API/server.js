require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const db = require("./models/index");
const route = require("./routes/ticket.route");
const routeAuth = require("./routes/auth.route");
const routeCategories = require("./routes/categories.routes");
const routeMessages = require("./routes/messages.routes");
const routeActivite = require ("./routes/activites.route")
const routeTags = require("./routes/tags.route")
const LoggerMiddlewares = require("./middlewares/logger.middlewares");
//communication en temps réel sinon on doit rafraichir la page pour voir les messages
const socket = require("socket.io");
//socket doit être branché sur un vrai serveur http
const http = require("http");
const { envoyerMessagesService } = require("./services/messages.service");
//création du serveur http
const server = http.createServer(app);

app.use(cors());
app.use(express.json());
app.use(LoggerMiddlewares);
app.use("/tickets", route);
app.use("/categories", routeCategories);
app.use("/messages", routeMessages);
app.use("/activites",routeActivite)
app.use("/tags",routeTags)
app.use(routeAuth);
//vérifie que le serveur tourne vraiment
app.get("/healthz", (req, res) => {
  res.json({
    status: "up",
  });
});
//reagrde si la BDD est bien connectée
db.sequelize
  .authenticate()
  .then(() => console.log("connexion réussie"))
  .catch((error) => console.error(error, "erreur de connexion via la BDD"));

db.sequelize
  .sync()
  .then(() => console.log("aucun problème avec les tables"))
  .catch((error) => console.error("problème avec les tables de la BDD", error));

const io = new socket.Server(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});
//connection au server
io.on("connection", (socket) => {
  // utilisateur connecté au serveur socket
  console.log("un utilisateur vient de se connecter");
  // rejoindre une room spécifique liée à un ticket
  socket.on("join_ticket", (ticketId) => {
    console.log(`un utilisateur se connecte dans la room ticket-${ticketId}`);
    // rejoint la room du ticket
    socket.join(`ticket-${ticketId}`);
  });
  // réception d'un nouveau message envoyé par le frontend
  socket.on("send_message", async (ticketId, message, userId) => {
    // sauvegarde du message dans la base de données
    const newMessage = await envoyerMessagesService({
      ticketId,
      message,
      userId,
    });
    // envoie du message à tous les utilisateurs
    // présents dans la room du ticket
    io.to(`ticket-${ticketId}`).emit("receive_message", newMessage);
  });
  // déconnexion utilisateur
  socket.on("disconnect", () => {
    console.log("un utilisateur s'est déconnecté");
  });
});

//lancement du server
server.listen(process.env.PORT, () => {
  console.log(
    `Serveur lancé sur le port: http://localhost:${process.env.PORT}`,
  );
});
