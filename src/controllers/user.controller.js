const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { createUser, getAll, getById, update, deleteUser } = require("../repositories/user.repository")
const { userValidation } = require("../validations/user.validations")
const { authenticate } = require('./auth.controller')

exports.create = async (req, res) => {
    try {
        await userValidation.validate(req.body)

        const password = await bcrypt.hash(req.body.password, 10)
        req.body.password = password

        const token = jwt.sign(
            { id: req.body.id, name: req.body.name, email: req.body.email},
            process.env.TOKEN_KEY,
            { expiresIn: '1h'}
        )
        const user = await createUser(req.body)

        res.status(200).send({user, token})
        
    } catch (err) {
        console.log(err)
        res.status(400).send(err)

    }
}

exports.getAll = async (req, res) => {
    try {
        const users = await getAll();
        res.status(200).send(users)
    } catch (err) {
        res.status(400).send(err)
    }
}

exports.get = async (req, res) => {
    try {
        const user = await getById(Number(req.params.id))
        res.status(200).send(user)
    } catch (err) {
        res.status(400).send(err)
    }
}

exports.update = async (req, res) => {
    try {
        const user = await update(Number(req.params.id), req.body)
        res.status(200).send(user)
    } catch (err) {
        res.status(400).send(err)
    }
}

exports.deleteUser = async (req, res) => {
    try {
        await deleteUser(Number(req.params.id))
        res.status(200).send("deletado com sucesso")
    } catch (err) {
        console.log(err)
        res.status(400).send(err)
    }
}