const jwt = require('jsonwebtoken')

exports.verifytoken = (req, res, next) => {
    const token = req.headers.authorization
    
    if(!token) {
        res.status(401).json({ message: "token é obrigatório"})
    }

    try {
        const tokenReplaced = token.replace("Bearer ", "")
        const decoded = jwt.verify(tokenReplaced, process.env.TOKEN_KEY)
        req.user = decoded
        next()
    } catch (err) {
        console.log(err)
        res.status(401).json({ message: "credencias inválidas"})
    }
}