const jwt = require("jsonwebtoken")

const auth = (req,res,next)=>{
    const token = req.headers.authorization.split(" ")[1]
    if(token){
    const decoded = jwt.verify(token,"b213018")
    if(decoded){
        req.body.userId = decoded.userId
        next()
    }else{
        res.status(401).json({message:"Invalid Token"})
    }
    }else{
        res.status(401).json({message:"No Token"})
    }
}
module.exports={auth}