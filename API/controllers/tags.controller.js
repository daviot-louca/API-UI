const {ajouterTagsService,modifierTagsService,supprimerTagsService} = require ("../services/tags.service")

const ajouterTags = async (req,res)=>{
    try {
        const {nom,categoryId} = req.body
        const infos = await ajouterTagsService({nom,categoryId})
        res.json(infos)
    } catch (error) {
        console.log(error)
    }
}

const modifierTags = async (req,res) => {
    try {
        const {id} = req.params
        const {nom} = req.body
        const infos = await modifierTagsService({id,nom})
        res.json(infos)
    } catch (error) {
        console.log(error)
    }
}

const deleteTags = async (req,res) => {
    try {
        const {id} = req.params
        const infos = await supprimerTagsService({id})
        res.json(infos)
    } catch (error) {
        console.log(error)
    }
}

module.exports = {ajouterTags,modifierTags,deleteTags}