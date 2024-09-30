const jwt = require("jsonwebtoken");
const config = require("../config/keys");

module.exports = (req, res, next)=>{
    const token = req.header("x-auth-token");

    if(!token){
        return res.json({msg: "unauthorized access"}).status(401)
    }
    try {
        const decoded = jwt.verify(token, config.jwtSecret);
        req.user = decoded.user;
        next();
        
    } catch (error) {
        return res.json({msg:"invalid token"}).status(401);
    }
}