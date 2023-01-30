const { userRoutes } = require("./user.routes")
const { authRoutes } = require("./auth.routes")
const { inputRoutes } = require("./input.routes")
const { outputRoutes } = require("./output.routes")
const { totalRoutes } = require("./total.routes")

module.exports = app => {
    userRoutes(app)
    authRoutes(app)
    inputRoutes(app)
    outputRoutes(app)
    totalRoutes(app)
}
