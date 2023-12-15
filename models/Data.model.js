const mongoose = require("mongoose")

const inputSchema = mongoose.Schema({
    name : String,
    annualInstalmentAmount : String,
    annualInterestRate  : String,
    totalNumberOfYears   : String, 
})

const inputModel = mongoose.model("data", inputSchema)
module.exports = {inputModel}

