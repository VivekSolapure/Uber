const blackListTokenModel = require("../models/blackListToken.model");
const userModel = require("../models/user.model");
const userService = require("../services/user.service")
const { validationResult } = require('express-validator')

module.exports.registerUser  = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, fullname, password } = req.body;

    const isUserExist = await userModel.findOne({email})
    if(isUserExist){
        return res.status(400).json({Error : "User alreadly exist"})
    }


    const hashPassword = await userModel.hashPassword(password);

    const user = await userService.createUser ({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashPassword
    });

    await user.save()

    const token = user.generateAuthToken();
    res.status(201).json({ token, user });
}
module.exports.loginUser = async (req, res, next) => {
    
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body

    const users= await userModel.find()    

    const user = await userModel.findOne({ email }).select('+password')
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    const isValidPassword = await user.comparePassword(password)
    if (!isValidPassword) {
        return res.status(401).json({ message: "Invalid password" });
    }
    const token = user.generateAuthToken();
    res.cookie("token", token)
    res.status(201).json({
         message: "Login sucessfull" ,
         user:{
            email: user.email,
            name: user.fullname,
            token: token
         }

    });
}

module.exports.getUserProfile=(req,res,next)=>{
    res.status(200).json(req.user)
}

module.exports.logoutUser = async (req, res, next)=>{ 
// this will create a blackList collection where the token will be stored of logout user,
//  if user stores the token in localmachine or somewhere he/she can still get logged in by just passing the token on header or cookie for that we have to check in middleware
//  if the token is in blacklist then we have to return 401


    res.clearCookie('token')
    const token = req.cookies.token || req.headers.authotization?.split(' ')[1];

    const blackList = await blackListTokenModel.create({token})
    
    blackList.save()
    
    res.status(200).json({message:"logged out Succesfully"})
}