const { prisma } = require('../service/prisma')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

exports.authenticate = async (req, res) => {
    try {
        const { email, password } = req.body
        
        console.log(prisma)

        if (!(email && password)) {
            return res.status(400).json({ message: "Email e senha são obrigatórios"})
        }

        const user = await prisma.user.findFirst({
            where: { 
                email
            }
        })
        

        if(user && !user.status) {
            return res.status(401).json({ message: "Usuário Bloqueado" })
        }

        if(user && bcrypt.compareSync(password, user.password)) {
            const token = jwt.sign(
                { id: user.id, name: user.name, email: user.email},
                process.env.TOKEN_KEY,
                { expiresIn: '1h'}
            )

            return res.status(200).json({ token })
        } else {
            return res.status(401).json({ message: 'Usuário e/ou senha incorretos'})
        }
    } catch(err) {
        console.log(err)
        return res.status(400).send(err)
    }
}

exports.validate = async (req, res) => {
    try {
        if(!req.body.token){
            return res.status(400).json({ message: "necessário informar o token"})
        }

        const decode = await jwt.decode(req.body.token)
        res.status(200).send(decode)
    } catch (err) {
        res.status(400).send(err)
    }
}