const mongoose = require("mongoose")
mongoose.connect("mongodb://localhost:27017/user-form-api")

const db = mongoose.connect
console.log("Connected to MongodDB Database");