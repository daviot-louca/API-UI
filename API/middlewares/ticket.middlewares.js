const TicketSchema = require("../schemas/ticket.schema");
//verifie les donnes du ticket pour savoir s'il est correct ou non
const TicketMiddleware = (req,res,next)=>{
    const verification = TicketSchema.safeParse(req.body)
    console.log("la requête est bien passée dans le middleware auth")
    if(!verification.success){
        res.status(400).json("données invalides")
        console.log("ça passe pas dans le schema")
    }else{
        next()
        console.log("ça passe")
    }
}

module.exports=TicketMiddleware;