const express = require("express");
const app = express();
const bodyParser = require("body-parser")
// const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const login = require ("./routes/login.js")
const register = require ("./routes/register.js")
const auth = require ("./routes/auhorize.js")
const refreshToken = require("./routes/refreshToken")

app.use(bodyParser.urlencoded({extended:true}))

app.use(login);
app.use(register);
app.use(auth)
app.use(refreshToken)

mongoose.connect('mongodb://localhost:27017/usersDB',
{ useNewUrlParser: true, useUnifiedTopology: true}).then(console.log("connected to DB"))

app.listen(3000,(err)=>{
    if(err){return console.log(err)}
    console.log("server running on port 3000")
})