
const express = require("express")
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")
const cors = require("cors")

const {connection} = require("./configs/db")
const {UserModel} = require("./models/User.model")

const {inputDataRouter} = require("./routes/Data.routes")
const {auth} = require("./middlewares/auth")
const app = express()

app.use(express.json())

app.use(cors({
    origin : "*"
}))

app.get("/", (req, res) => {

    res.json({message : "API is working, please refer docs for more"})
})

app.post("/register", async (req, res) => {
    const {email, password} = req.body;

    const user_already_exist = await UserModel.findOne({email})
    if(user_already_exist){

        return res.json({message : "User already exists, please login"})
    }

    bcrypt.hash(password, 8, async function(err,hash){
        await UserModel.create({email, password : hash})
        return res.json({message : "Registation sucessfull"})
    })
  
})

app.post("/login", async (req, res) => {
    const {email, password} = req.body;
    const user = await UserModel.findOne({email})
    if(!user){
        return res.json({message : "register first!"})
    }

    const hashed_password = user?.password
    bcrypt.compare(password, hashed_password, function(err, result) {
        if(result){
            const token = jwt.sign({userId : user._id}, 'oursecret');
            return res.json({message : "Login Successfull", token : token})
        }
        else{
            return res.json({message : "Invalid credentials Login failed"})
        }
    });
})

app.use(auth)

app.use("/inputDatas", inputDataRouter)

app.listen(8080, async () => {
    try{
        await connection;
        console.log("connected to mongodb successfully")
    }
    catch(err){
        console.log("error while connecting to DB")
        console.log(err)
    }
    console.log("listening on port 8080")
})