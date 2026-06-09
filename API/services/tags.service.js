
const tags = require("../models/tags.model")

const ajouterTagsService = async ({nom,categoryId})=>{
    const infos = await tags.create({nom,categoryId})
    return infos
}

const modifierTagsService = async ({id,nom})=>{
    const tag = await tags.findByPk(id)
    if (!tag){
        throw new Error("Tag introuvable")
    }
    if(!nom){
        throw new Error("Nom introuvable")
    }
    tag.nom = nom
    return await tag.save()
}

const supprimerTagsService = async ({id}) => {
    const infos = await tags.destroy({where:{id}})
    return infos
}

module.exports = {ajouterTagsService,modifierTagsService,supprimerTagsService}

