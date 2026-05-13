
const {seeTicketService,createTicketService,updateTicketService,deleteTicketService,seeAllService} = require("../services/ticket.service")



const seeAll = async (req,res) =>{
    try {
        const {page,limit}=req.query;
        const pageNumber = Number(page);
        const limitNumber = Number(limit)
        const informations = await seeAllService({pageNumber,limitNumber})
        res.json(informations)
    } catch (error) {
        res.status(500).json("erreur avec le seeAll")
    }
}

const seeTicket = async (req,res) =>{
    try {
        const id = req.user.id
        const {page,limit}=req.query;
        const pageNumber = Number(page);
        const limitNumber = Number(limit)
        const informations = await seeTicketService({id,pageNumber,limitNumber})
        res.json(informations)
    } catch (error) {
        res.status(500).json("erreur avec le seeTicket")
    }
}

const createTicket = async (req,res)=>{
    try {
        const id = req.user.id;
        const {title,description,status} = req.body
        const informations = await createTicketService({id,title,description,status})
        res.json(informations) 
    } catch (error) {
        console.log(error)
        res.status(500).json("erreur dans le controller ou dans le service")
    }
}

const updateTicket = async(req,res)=>{
    try {
        const ticketId = req.params.id;
        const id = req.user.id
        const {title,description,status} = req.body;
        const info = await updateTicketService({id,ticketId,title,description,status})
        res.json(info)
    } catch (error) {
        console.log(error)
        res.status(500).json("erreur dans le controller ou dans le service")
    }
}

const deleteTicket = async (req,res)=>{
    try {
        const ticketId = req.params.id;
        const id = req.user.id;
        const info = await deleteTicketService({ticketId,id})
        res.json(info)
    } catch (error) {
        console.log(error)
        res.status(500).json("erreur dans le controller ou dans le service")
    }
}

    
module.exports ={seeTicket,createTicket,updateTicket,deleteTicket,seeAll};