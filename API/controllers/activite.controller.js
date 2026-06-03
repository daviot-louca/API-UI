const {voirToutesActivitesService,voirmesActivitesRecentesService} = require("../services/activite.service")

const voirToutesActivites = async (req,res) => {
    try {
        const infos =await  voirToutesActivitesService()
        res.json(infos)
    } catch (error) {
        console.log(error)
    }
}

const voirmesActivitesRecentes = async(req,res) => {
    try {
        const id = req.user.id
        const infos = await voirmesActivitesRecentesService(id)
        res.json(infos)
    } catch (error) {
        console.log(error)
    }
}

module.exports = {voirmesActivitesRecentes,voirToutesActivites}