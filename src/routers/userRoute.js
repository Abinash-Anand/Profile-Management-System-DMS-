const express = require("express")
const User = require("../models/user")
const router = new express.Router();

//Create a USER Route- POST request 
router.post('/submitForm',async(req, res)=>{
    try {
        console.log(req.body);
        const newUser = new User(req.body)
        await newUser.save()
        res.send(newUser);
    } catch (error) {
     res.status(404).send(error)   
    }
})
//Read User By USER ID Route- GET request
router.get("/user/?query", async (req, res) => {
  try {
    const query = req.params.query;

    // Use a case-insensitive comparison for an exact match on the name field
    const user = await User.findOne({ name:query});

    if (!user) {
      throw new Error("No user found with that name");
    }

    res.status(200).send(user);
  } catch (error) {
    console.error('Error:', error.message);
    res.status(400).send("Error fetching user"); // Send a generic error message to the client
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
router.patch("/user/:id",async(req,res)=>{
    const updates = Object.keys(req.body)
    const allowedUpdates=["username","userProfile","email","phone","password"]
    const isValidOperation = updates.every((upData)=>allowedUpdates.includes(upData))
    if(!isValidOperation){
        return res.status(404).send("Invalid Update!")
    }
      try {
       const user = await User.findById(req.params.id);
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