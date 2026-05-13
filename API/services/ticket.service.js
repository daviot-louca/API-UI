const Ticket = require("../models/ticket.model")
const User = require("../models/user.model")

const seeAllService = async({pageNumber = 1 ,limitNumber=5}) =>{
    const limit = limitNumber
    const offset = ((pageNumber-1)*limitNumber)
    const data = await Ticket.findAll({
        limit,
        offset,
        include:User
    })
    return data
}

const seeTicketService = async({id,pageNumber = 1 ,limitNumber=5}) =>{
    const limit = limitNumber
    const offset = ((pageNumber-1)*limitNumber)
    const data = await Ticket.findAll({
        where:{userId:id},
        limit,
        offset,
        include:User
    })
    return data
}

const createTicketService =async ({id,title,description,status}) =>{
    const envoie = await Ticket.create({
        userId:id,
        title,
        description,
        status
    });
    return envoie
}

const updateTicketService = async({id,ticketId,title,description,status}) =>{
    const ticket = await Ticket.findByPk(ticketId);

    if (!ticket) {
        return "ticket introuvable";
    }
    if (ticket.userId !== id) {
        return "accès interdit";
    }
    ticket.title = title;
    ticket.description = description;
    ticket.status = status;
    await ticket.save();
    return ticket;
}


const deleteTicketService = async({ticketId,id})=>{
    const supprimer = await Ticket.destroy({where:{id:ticketId,userId:id}})
    return supprimer
}


module.exports = {seeTicketService,createTicketService,updateTicketService,deleteTicketService,seeAllService};    