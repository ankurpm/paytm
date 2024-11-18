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

const accountSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    balance: { type: Number, required: true, default: 1000 }
}, {
    timestamps: true 
})

const Account = mongoose.model("Account", accountSchema)

module.exports = {User, Account}