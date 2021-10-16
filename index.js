// Main file for backend
const path = require("path");
require('dotenv').config({path: path.resolve(__dirname,'./.env')});
const express = require("express");
const cors = require("cors");
const connectToMongo = require("./db");

connectToMongo();
const app = express();
app.use(cors())
const port = process.env.PORT || 5000;

app.use(express.json());

app.use('/api/auth', require('./routes/auth'));
app.use('/api/posts', require('./routes/posts'));

app.listen(port, ()=> {
    console.log(`Server started successfully at port ${port}`)
})