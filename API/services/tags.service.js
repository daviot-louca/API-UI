
const tags = require("../models/tags.model")

const ajouterTagsService = async ({nom,categoryId})=>{
    const noms = nom.split(",")
    const infos = []
    for(var inoms=0;inoms<noms.length;inoms++){
        noms[inoms] = noms[inoms].trim()
        infos.push(await tags.create({nom:noms[inoms],categoryId})) 
    }
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

