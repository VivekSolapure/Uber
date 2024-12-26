const userModel= require("../models/user.model")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const blackListTokenModel = require("../models/blackListToken.model");

module.exports.isLogin=async (req, res, next)=> { // getting the token form cookie or header
    const token = await req.cookies.token || req.headers.authorization?.split(" ")[1]
    
    if (!token) {
        return res.status(401).json({ message: "Please login first" })
    }

    //isBlackList checks if the token passed is blacklisted or not, if blacklisted then return 401
    const isBlackListed =await blackListTokenModel.findOne({token})

    if(isBlackListed){
         return res.status(401).json({message:"Unathorized"})
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SCRET)        
        const user = await userModel.findById(decoded._id)
        
        req.user=user
        next()
    }catch(err){
        return res.status(401).json({ message: "Unauthorized",err })
    }

}