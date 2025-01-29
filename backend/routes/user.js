const express = require('express');
const app = express();
const router = express.Router();
const zod = require("zod");
const { User, Account } = require('../db');
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require('../config');
const mongoose = require('mongoose');
const dbConfig = require("./../config.json");
const authMiddleware = require('../middleware');
app.use(express.json());

//create mongo db connection
mongoose.connect(`${dbConfig.connectionString}/${dbConfig.dbName}`)
    .then(() => console.log("DB connection successful"))
    .catch(err => console.log("Error connecting to DB:", err));

function validateUser(reqBody) {
    const reqSchema = zod.object({
        email: zod.string().email(),
        password: zod.string().min(8),
        firstName: zod.string().max(50),
        lastName: zod.string().max(50)
    })
    const response = reqSchema.safeParse(reqBody);
    return response;
}

function validatePassword(user, password) {
    return user.password === password
}

router.post("/signup", async function (req, res) {

    const username = req.body.email
    const password = req.body.password
    const firstName = req.body.firstName
    const lastName = req.body.lastName

    //validate user input
    const response = validateUser(req.body)
    if (!response.success) {
        return res.status(400).json({ msg: "Invalid request parameters" })
    }
    //check if user already exists in db
    const userExists = await User.findOne({ username: username })
    if (userExists) {
        return res.status(400).json({ msg: "Email already exists" })
    }
    //if user is new then store the user info in DB
    const newUser = new User({
        username: username,
        password: password,
        firstName: firstName,
        lastName: lastName
    });
    try {
        const userCreated = await newUser.save()
        //fetch userId of the created user
        const userId = userCreated._id;
        //add userId to Account schema and add default balance
        const account = new Account({
            userId: userId,
            balance: 10000
        })

        const accountUpdate = await account.save()

        //create jwt token
        const token = jwt.sign({ username: username }, JWT_SECRET)
        //return the success response
        return res.json({ message: "User created successfully", token: token })
    } catch (error) {
        return res.status(500).json({ msg: "Error saving user to DB", error });

    }
    //return 411 error code for errror 

})

router.post('/signin', async function (req, res) {

    const username = req.body.email
    const password = req.body.password
    //check if user exists in db
    const user = await User.findOne({ username: username })
    const userId = user._id;
    if (!user) {
        return res.status(401).json({ msg: "Invalid credentials" })
    }
    const isMatch = validatePassword(user, password)
    //compare password
    if (!isMatch) {
        return res.status(401).json({ msg: "Invalid credentials" })
    }
    //create jwt token
    const token = jwt.sign({ userId: userId }, JWT_SECRET)
    //return the success response
    return res.json({ message: "User logged in successfully", token: token })

})

router.put('/', authMiddleware, async function (req, res) {

    const password = req.body.password
    const firstName = req.body.firstName
    const lastName = req.body.lastName
    const userId = req.userId
    try {
        //check if user exists in db
        const user = await User.findOne({ username: userId })
        if (user) {
            //check if password needs to be changed
            if (password !== null) {
                user.password = password
            }
            //check if firstName needs to be changed
            if (firstName != null) {
                user.firstName = firstName
            }
            //check if lastName needs to be changed
            if (lastName != null) {
                user.lastName = lastName
            }
        }
        const updatedUser = await user.save()
        return res.status(200).json({ msg: "User updated" })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: "Error updating user" })
    }
})

router.get('/bulk', async (req, res) => {
    //get the query param
    const queryParam = req.query.filter
    try {
        //get all db users & filter based on query param

        const users = await User.find().then((users) => {

            if(queryParam) {
                return users.filter(user => user.lastName === queryParam || user.firstName === queryParam)
            }
            return users;
        })
        // send back the results
        return res.status(200).json({ users: users })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: "Error fetching users" })
    }
})


module.exports = router;