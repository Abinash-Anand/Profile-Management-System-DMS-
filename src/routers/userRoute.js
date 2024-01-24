const express = require("express")
const User = require("../models/user")
const router = new express.Router();

//Create a USER Route- POST request 
// router.post('/submitForm', async (req, res) => {
//     try {
//         console.log(req.body);
//         const newUser = new User(req.body);
//         await newUser.save();
        
//         // Send a success response or any additional logic here
//         res.status(201).send(newUser);
//     } catch (error) {
//         res.status(500).send(error.message);
//     }
// });

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

// SEARCHING A USER BASED ON MULTIPLE CRITERIA
router.post("/user/search", async (req, res) => {
    try {
        const { username, userProfile, email, phone } = req.body;

        const findUser = await User.findOne({
            $or: [
                { username },
                { userProfile },
                { email },
                { phone }
            ]
        });
        if (!findUser) {
            throw new Error("User not found")
        }
        console.log(findUser);
        res.status(200).send(findUser);
    } catch (error) {
        res.status(500).send(error);
    }
});



//Read All USERS Route- GET request

const ITEMS_PER_PAGE = 5; // You can adjust this value based on your preference

router.get("/user", async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const pageSize = parseInt(req.query.pageSize) || ITEMS_PER_PAGE;

        const startIndex = (page - 1) * pageSize;
        const endIndex = page * pageSize;

        const totalUsers = await User.countDocuments({});
        const totalPages = Math.ceil(totalUsers / pageSize);

        const users = await User.find({})
            .skip(startIndex)
            .limit(pageSize);

        if (!users || users.length === 0) {
            throw new Error("Users not found");
        }

        res.status(200).json({
            users,
            currentPage: page,
            totalPages,
            totalUsers
        });
        
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

//Update USER  Route- PATCH request
router.patch("/user/:id",async(req,res)=>{
    const updates = Object.keys(req.body)
    const allowedUpdates=["username","userProfile","email","phone","password"]
    const isValidOperation = updates.every((upData)=>allowedUpdates.includes(upData))
    if(!isValidOperation){
        return res.status(404).send("Invalid Update!")
    }
      try {
        console.log(User);
        console.log(req.params);
        const id = req.params.id
        const user = await User.findById(id);
        console.log(user);
       if(!user){
        return res.status(404).send()
       }
        updates.forEach((update)=>user[update] = req.body[update])
        await user.save()
        res.status(200).send({ user});
  
      } catch (error) {
        res.send(error)
      }
})

//Delete USER Route- DEL request
router.delete("/user/:id",async(req,res)=>{
    try {
        const user = await User.findByIdAndDelete(req.params.id)
        console.log(req.params.id);
        res.status(200).send(user)
    } catch (error) {
        res.status(400).send(error)
    }
})

module.exports=router