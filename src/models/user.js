const validator  =  require("validator")
const mongoose= require("mongoose")
const bcrypt = require('bcrypt')
const userSchema = mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    userProfile:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true,
        validate(email){
            if(!(validator.isEmail(email))){
                throw new Error('Invalid email provided!');
            }
        }
    },
    phone:{
        type:Number,
        required:true,
        unique:true,
        trim:true,
        maxLength:10
    },
    password:{
        type:String,
        required:true,
        trim:true,
        minLength:7,
        validate:(password)=>{
            if(password.toLowerCase().includes('password')){
                throw new Error('This password text is forbidden!')
            
        }
    } 
    }
})

//Hashing the password
userSchema.pre("save", async function(next){
    const thisUser = this;
    if(thisUser.isModified('password')){
        thisUser.password = await bcrypt.hash(thisUser.password, 10)
        next();
    }
   else{
    next()
   }
})
const User = mongoose.model("User", userSchema)
module.exports = User