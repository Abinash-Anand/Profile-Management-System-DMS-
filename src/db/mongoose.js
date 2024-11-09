const mongoose = require("mongoose")
require('dotenv').config()

// const dbURL = process.env.MONGODB_URL
mongoose.connect('mongodb+srv://abinash_Nodejs:evy6apG9SY6mVd8l@eber.5lil8.mongodb.net/?retryWrites=true&w=majority&appName=Eber')

const db = mongoose.connect
console.log("Connected to MongodDB Database: ");