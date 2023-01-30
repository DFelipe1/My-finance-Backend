const {verifytoken} = require('../middlewares/auth')
const {getTotalsByMonth} = require('../controllers/total.controller')

exports.totalRoutes = app => {
    app.get('/total/month', verifytoken, getTotalsByMonth)
}
