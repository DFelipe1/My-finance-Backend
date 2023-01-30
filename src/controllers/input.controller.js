const { inputValidation } = require('../validations/input.validation')
const { 
    createInputs,
    getAll,
    getId,
    update,
    deleteInput,
    filterMonth
} = require('../repositories/input.repository')


exports.create = async (req, res) => {
    try {
        req.body.userId = req.user.id
        console.log(req.body)
        await inputValidation.validate(req.body)
        const input = await createInputs(req.body)
        res.status(200).send(input)
    } catch (err) {
        res.status(400).send(err)
    }
}

exports.getAllInputs = async (req, res) => {
    try {
        const userId = req.user.id
        const inputs = await getAll(userId)
        res.status(200).send(inputs)
    } catch (err) {
        res.status(400).send(err)
    }
}

exports.getUnique = async (req, res) => {
    try {
        const userId =  req.user.id
        const input = await getId(Number(req.params.id))

        if(input.userId !== userId) {
            return res.status(400).send(err)
        }

        res.status(200).send(input)
    } catch (err) {
        res.status(400).send(err)
        console.log(err)
    }
}

exports.update = async (req, res) => {
    try {
        req.body.userId = req.user.id
        console.log(req.body)
        await inputValidation.validate(req.body)
        const input = await update(Number(req.params.id), req.body)
        res.status(200).send(input)
    }catch (err) {
        console.log(err)
        res.status(400).send(err)
    }
}

exports.remove = async (req, res) => {
    try {
        await deleteInput(Number(req.params.id))
        res.status(200).send("deletado com sucesso")
    } catch (err) {
        console.log(err)
        res.status(400).send(err)
    }
}

exports.getFilterMonth = async (req, res) => {

    try {
        if(!req.query.month) {
            throw({ message: "é obrigatorio colocar um mes"})
        }
    
        const inputs = await filterMonth(req.query.month, req.user.id)
        res.status(200).send(inputs)
    } catch (err) {
        res.status(400).send(err)
    }    
}