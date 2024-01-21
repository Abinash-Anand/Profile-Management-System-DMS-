const express = require("express")
const User = require("../models/user")
const router = new express.Router();

//Create a USER Route- POST request 
router.post('/submitForm', async (req, res) => {
    try {
        console.log(req.body);
        const newUser = new User(req.body);
        await newUser.save();
        
        // Send a success response or any additional logic here
        res.status(201).send(newUser);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Create User Route - POST request
router.post("/submitForm", async (req, res) => {
    try {
        // Check if the username or email already exists
        const existingUser = await User.findOne({
            $or: [{ username: req.body.username }, { email: req.body.email }]
        });

        if (existingUser) {
            throw new Error("Username or email already in use");
        }

        // Create a new user
        const newUser = new User(req.body);

        // Save the new user to the database
        await newUser.save();

        res.status(201).send(newUser);
    } catch (error) {
        console.error('Error:', error.message);
        res.status(400).send(error.message);
    }
});

//Read All USERS Route- GET request

router.get("/user", async(req,res)=>{
    try {
        const allUsers =await User.find({});
        if(!allUsers){
            throw new Error("users not found")

        } 
        res.status(200).send(allUsers)
    } catch (error) {
    res.status(404).send(error)        
    }
})
//Update USER  Route- PATCH request
router.patch("/user/:query",async(req,res)=>{
    const updates = Object.keys(req.body)
    const allowedUpdates=["username","userProfile","email","phone","password"]
    const isValidOperation = updates.every((upData)=>allowedUpdates.includes(upData))
    if(!isValidOperation){
        return res.status(404).send("Invalid Update!")
    }
      try {
       const user = await User.findOne({username:req.params.query});
       if(!user){
        return res.status(404).send()
       }
        updates.forEach((update)=>user[update] = req.body[update])
        await user.save()
        res.status(200).send(user);
  
      } catch (error) {
        res.status(400).send(error)
      }
})

//Delete USER Route- DEL request
router.delete("/user",async(req,res)=>{
    try {
        const user =await User.findOneAndDelete(req.body)
        res.status(200).send(user)
    } catch (error) {
        res.status(400).send(error)
    }
})

module.exports=router