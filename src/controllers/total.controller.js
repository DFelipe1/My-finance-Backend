const {getTotalsByMonth} = require('../repositories/total.repository')

exports.getTotalsByMonth = async (req, res) => {
    try {
        if(!req.query.month) {
            throw({ message: 'obrigatorio colocar um month'})
        }

        const totalMonth = await getTotalsByMonth(req.query.month, req.user.id)


        res.status(200).send(totalMonth)
    } catch (err) {
        res.status(400).send(err)
    }
}