const express = require("express")
const cors = require('cors')
const validator = require("validator")
const User = require("./models/user")
const bodyParser = require('body-parser');
require("./db/mongoose")
require('dotenv').config()
const hbs =require('hbs')
const path = require("path")
const userRoute = require('./routers/userRoute')
const app = express()
const port = process.env.PORT || 5000;
const viewsPath  =path.join(__dirname,"../templates/views")
const partialsDirPath = path.join(__dirname,"../templates/partials")
const publicDirPath = path.join(__dirname, "../public")
console.log(viewsPath);
console.log(partialsDirPath);
//Middlewares
app.use(cors({
    origin: "*"
}))
app.use(express.static(publicDirPath))
app.set('view engine', 'hbs')
app.set('views', viewsPath);
hbs.registerPartials(partialsDirPath)
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json())
app.use(userRoute)


app.get('',(req,res)=>{
    res.render("index",{
        title:"Form Validator App"
    })
})
app.listen(port, ()=>{
    console.log("server is up and running at PORT 5000");
})