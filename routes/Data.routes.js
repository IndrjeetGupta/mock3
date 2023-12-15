const express = require("express")
const {inputModel} = require("../models/Data.model");
const { UserModel } = require("../models/User.model");

const inputDataRouter = express.Router();

inputDataRouter.get("/", async (req, res) => {
    const inputDatas =  await inputModel.find({})
    res.send({inputDatas : inputDatas})
})

inputDataRouter.post("/create", async (req, res) => {
    const {    name,
        annualInstalmentAmount,
        annualInterestRate,  
        totalNumberOfYears   
    
    } = req.body;

    const userID = req.userID;

    const user = await UserModel.findOne({_id : userID})
    const authorEmail = user.email

    const inputDatas =  await inputModel.create({
        name,
        annualInstalmentAmount,
        annualInterestRate,  
        totalNumberOfYears   
    
    })
    res.send({inputDatas : inputDatas})
})

module.exports = {inputDataRouter}