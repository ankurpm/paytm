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
    console.log("Inside validateUser: "+reqBody)
    const reqSchema = zod.object({
        email: zod.string().email(),
        password: zod.string().min(8),
        firstName: zod.string().max(50),
        lastName: zod.string().max(50)
    })
    console.log("zod schema created")

    const response = reqSchema.safeParse(reqBody);
    console.log("zod validation done: "+response)

    return response;

}

//connect to mongoose server

router.post("/signup", async function(req, res) {
    console.log("Inside the post method")

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
        return res.status(400).json({msg:"user already exists"})
    }
    //if user is new 
    //store in db
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

app.use('/signin', function(req, res) {

    //validate user credentials
    //create jwt token
    //return the success response
    //return 411 error code for errror 


})


module.exports = router;