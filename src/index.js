const express = require("express")
const validator = require("validator")
const User = require("./models/user")
require("./db/mongoose")
const userRoute = require('./routers/userRoute')


const app = express()
const port = process.env.PORT || 5000;

//Middlewares
app.use(express.json())
app.use(userRoute)

app.listen(port, ()=>{
    console.log("server is up and running at PORT 5000");
})