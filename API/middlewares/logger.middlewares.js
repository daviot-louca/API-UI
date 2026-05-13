//pour chaque requete il note la date la methode et l'url
const LoggerMiddlewares = (req,res,next) => {
    const url = req.url
    const method = req.method
    const date = new Date().toISOString()
    console.log(`${date}  ${method}  ${url}`)
    next()
}

module.exports = LoggerMiddlewares;