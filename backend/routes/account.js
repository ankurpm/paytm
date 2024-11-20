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

router.get('/balance', authMiddleware, async function (req, res) {
    const userId = req.userId
    console.log(userId)

    //call account table to find the balance
    try {
        const account = await Account.findOne({ userId: userId })
        if (account) {
            return res.status(200).json({ balance: account.balance })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: "Error fetching account balance" })
    }
    return res.status(200).json({ msg: 'no balance data' })

})

router.post('/transfer', authMiddleware, async function (req, res) {
    //get userId of the from user
    const fromUser = req.userId
    console.log("from user id is "+fromUser)
    //get user id of the to user
    const toUser = req.body.to
    console.log("to user id is "+fromUser)

    //get amount to transfer
    const amount = req.body.amount
    


    //check if suffiecient balance is there, otherwise return error response
    try {

        //get 'from' account info
        const fromAccount = await Account.findOne({ userId: fromUser })

        if (!fromAccount || fromAccount.balance < amount) {
            return res.status(500).json({ msg: "insufficient bank balance" })
        }
        //get 'to' account info
        const toAccount = await Account.findOne({ userId: toUser })
        if (!toAccount) {
            res.status(500).json({ msg: "recepient account not correct" })
        }

        //perform account updates
        //*****findByIdAndUpdate***** function can also be used to update account
        const fromUpdate = await Account.updateOne({userId: fromUser}, { $inc: { balance: -amount}})
        const toUpdate = await Account.updateOne({userId: toUser}, { $inc: { balance: amount}})
        console.log("update from user:"+fromUpdate)
        console.log("updated to user: "+toUpdate)
        return res.status(200).json({msg:"Transfer complete"})

    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: "Error fetching account balance" })
    }

})





module.exports = router;