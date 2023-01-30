const { authenticate,validate } = require('../controllers/auth.controller')

exports.authRoutes = (app) => {
    app.post("/login", authenticate)
    app.post("/validate", validate)
}