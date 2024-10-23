const mongoose = require("mongoose")


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        maxLength: 30
    },
    password: {
        type: String,
        required: true,
        trim: true,
        maxLength: 8,
        minLength: 8

    },
    firstName: { 
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    }
}, {
    timestamps: true // automatically adds createdAt and updatedAt fields
})

const User = mongoose.model("User", userSchema)

module.exports = User