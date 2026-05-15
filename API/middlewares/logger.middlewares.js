//pour chaque requete il note la date la methode et l'url
const LoggerMiddlewares = (req,res,next) => {
    try {
       const url = req.url
    const method = req.method
    const date = new Date().toISOString()
    console.log(`${date}  ${method}  ${url}`)
    console.log("ça passe tranquille")
    next()  
    } catch (error) {
        console.log("y'a un truc qui bug")
    }
   
    
}

module.exports = LoggerMiddlewares;