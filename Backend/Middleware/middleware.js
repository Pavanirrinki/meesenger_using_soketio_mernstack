const jwt = require("jsonwebtoken")

module.exports = function(req,res,next){
    try{
let token = req.header("x-token") 
if(!token){                       
    return res.status(404).send("token not found") 
}
let decode = jwt.verify(token,"jwtpassword") 
req.user = decode.user
next() 
    }catch(error){
        console.log(error)
        return res.status(400).send('Authentification error')
            }
        }