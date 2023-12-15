const jwt = require("jsonwebtoken")

const auth = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1]

    if(!token){
        return res.json({message : "Please login first"})
    }
    jwt.verify(token, 'oursecret', function(error, decoded) {
        if(error){
            return res.json({message : "Invalid token,  login first"})
        }

        const userId = decoded.userId
        req.userID = userId
        next()
    });
}
module.exports = {auth}