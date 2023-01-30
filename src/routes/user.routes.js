const { 
    create,
    getAll, 
    get, 
    update, 
    deleteUser 
} = require("../controllers/user.controller")
const { verifytoken } = require("../middlewares/auth")

exports.userRoutes = app => {
    app.post("/user", create)
    app.get("/users", verifytoken, getAll)
    app.get("/user/:id", verifytoken, get)
    app.put("/user/:id", verifytoken, update)
    app.delete("/user/:id", verifytoken, deleteUser)
}