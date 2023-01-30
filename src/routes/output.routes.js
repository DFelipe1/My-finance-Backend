const { verifytoken } = require('../middlewares/auth')
const { 
    create,
    getAll,
    getOutput,
    updateOutput,
    deteteOutput,
    filterMonth
} = require('../controllers/output.controller')

exports.outputRoutes = app => {
    app.post('/output', verifytoken, create);
    app.get('/output/list', verifytoken, getAll);
    app.get('/output/:id', verifytoken, getOutput);
    app.put('/output/:id', verifytoken, updateOutput);
    app.delete('/output/:id', verifytoken, deteteOutput);
    app.get('/output/filter/month', verifytoken, filterMonth);
}