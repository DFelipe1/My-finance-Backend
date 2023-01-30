const express = require('express');
const cors = require('cors');
const routes = require('./routes/')
const dotenv = require('dotenv')

dotenv.config()

const app = express();

app.use(cors());
app.use(express.json());

routes(app);

app.listen(3333, console.log("api is running"));