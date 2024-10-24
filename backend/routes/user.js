const express = require('express');
const router = express.Router();
const app = express();
const zod = require("zod");
const User = require('../db');
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require('../config');
const mongoose = require('mongoose');
const dbConfig = require("./../config.json")

//create mongo db connection
mongoose.connect(`${dbConfig.connectionString}/${dbConfig.dbName}`)
.then(() => console.log("DB connection successful"))
.catch(err => console.log("Error connecting to DB:", err));

function validateUser(reqBody){
    const reqSchema = zod.object({
        email: zod.string().email(),
        password: zod.string().min(8),
        firstName: zod.string().max(50),
        lastName: zod.string().max(50)
    })
    const response = reqSchema.safeParse(reqBody);
    return response;
}

function validatePassword(user, password){
    return user.password === password
}

router.post("/signup", async function(req, res) {

    const username = req.body.email
    const password = req.body.password
    const firstName = req.body.firstName
    const lastName  = req.body.lastName

    //validate user input
    const response = validateUser(req.body)
    if(!response.success){
        return res.status(400).json({msg: "Invalid request parameters"})
    }
    //check if user already exists in db
    const userExists = await User.findOne({username: username})
    if(userExists){
        return res.status(400).json({msg:"Email already exists"})
    }
    //if user is new then store the user info in DB
    const newUser = new User({
        username:username, 
        password:password, 
        firstName:firstName, 
        lastName:lastName
    });
    try{
    const userCreated =  await newUser.save()
    
    //create jwt token
    const token = jwt.sign({username: username}, JWT_SECRET)
    //return the success response
    return res.json({message:"User created successfully",token: token})   
}catch(error){
    return res.status(500).json({ msg: "Error saving user to DB", error });

}
    //return 411 error code for errror 

})

router.post('/signin', async function(req, res) {

    const username = req.body.email
    const password = req.body.password
    //check if user exists in db
    const user = await User.findOne({username: username})
    if(!user){
        return res.status(401).json({msg:"Invalid credentials"})
    }
    const isMatch = validatePassword(user, password)
    //compare password
    if(!isMatch){
        return res.status(401).json({msg:"Invalid credentials"})
    }
    //create jwt token
    const token = jwt.sign({username: username}, JWT_SECRET)
    //return the success response
    return res.json({message:"User logged in successfully", token: token})

})


module.exports = router;