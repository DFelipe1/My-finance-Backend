const {outputValidation} = require('../validations/output.validation')
const {
    createOutput,
    getAll,
    getOutput,
    updateOutput,
    deleteOutput,
    filterMonth
} = require('../repositories/output.repository')

exports.create = async (req, res) => {
    try {
        req.body.userId = req.user.id
        const output = await createOutput(req.body)
        await outputValidation.validate(req.body)
        res.status(200).send(output)
    } catch (err) {
        res.status(400).send(err)
    }
}

exports.getAll = async (req, res) => {
    try {
        const outputs = await getAll(req.user.id)
        res.status(200).send(outputs)
    } catch (err) {
        res.status(400).send(err)
    }
} 

exports.getOutput = async (req, res) => {
    try {
        const output = await getOutput(Number(req.params.id))
        res.status(200).send(output)
    } catch (err) {
        res.status(400).send(err)
    }
}

exports.updateOutput = async (req, res) => {
    try {
        req.body.userId = req.user.id
        await outputValidation.validate(req.body)
        const output = await updateOutput(Number(req.params.id), req.body)
        res.status(200).send(output)
    } catch (err) {
        console.log(err)
        res.status(400).send(err)
    }
}

exports.deteteOutput = async (req,res) => {
    try {
        await deleteOutput(Number(req.params.id))
        res.status(200).send("deletado com sucesso")
    } catch (err) {
        res.status(400).send(err)
    }
}

exports.filterMonth = async (req, res) => {
    try {
        if(!req.query.month) {
            throw({ message: 'é obrigatorio preencher o campo'})
        }

        console.log(req.query.month)

        const output = await filterMonth(req.query.month, req.user.id)
        res.status(200).send(output)
    } catch (err) {
        res.status(400).send(err)
    }
}