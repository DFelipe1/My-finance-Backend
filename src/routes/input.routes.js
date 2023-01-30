const { verifytoken } = require('../middlewares/auth')
const { 
    create,
    getAllInputs,
    getUnique,
    update,
    remove,
    getFilterMonth
} = require("../controllers/input.controller")

exports.inputRoutes = app => {
    app.post("/input/", verifytoken, create)
    app.get("/input/list", verifytoken, getAllInputs)
    app.get("/input/:id", verifytoken, getUnique)
    app.put("/input/:id", verifytoken, update)
    app.delete("/input/:id", verifytoken, remove)
    app.get("/input/filter/month", verifytoken, getFilterMonth)
}