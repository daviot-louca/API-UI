require("dotenv").config()
const express = require("express")
const cors = require("cors")
const app = express();
const db = require("./models/index")
const route  = require("./routes/ticket.route")
const routeAuth  = require("./routes/auth.route")
const LoggerMiddlewares = require("./middlewares/logger.middlewares")

app.use(cors())
app.use(express.json())
app.use(LoggerMiddlewares)
app.use(route)
app.use(routeAuth)
//vérifie que le serveur tourne vraiment
app.get("/healthz", (req,res)=>{
    res.json({
        status:'up'
    })
}
)
//reagrde si la BDD est bien connectée
db.sequelize.authenticate()
    .then(()=>console.log("connexion réussie"))
    .catch((error)=>console.error(error,"erreur de connexion via la BDD"))

db.sequelize.sync()
    .then(()=>console.log("aucun problème avec les tables"))
    .catch((error)=>console.error("problème avec les tables de la BDD",error))

//lancement du server
app.listen(process.env.PORT,()=>{
    console.log(`Serveur lancé sur le port: http://localhost:${process.env.PORT}`)
})