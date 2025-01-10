const captainModel = require("../models/captain.model")
const { validationResult } = require('express-validator');
const captainService = require("../services/captain.service")
const blackListTokenModel = require("../models/blackListToken.model");

module.exports.registerCaptain = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { email, fullname, password, vehicle } = req.body;

    const isCaptainExist = await captainModel.findOne({email})
    if(isCaptainExist){
        return res.status(400).json({Error : "Captain alreadly exist"})
    }

    const hashPassword = await captainModel.hashPassword(password);
    const captain = await captainService.createCaptain(
        {
            firstname: fullname.firstname,
            lastname: fullname.lastname,
            email,
            password: hashPassword,
            color:vehicle.color,
            plate:vehicle.plate,
            capacity:vehicle.capacity,
            vehicleType:vehicle.vehicleType,

        }
    );

    
    
    let token = captain.generateAuthToken();
    
    await captain.save()
    return res.status(201).json({ token:token,captain});

}


module.exports.captainLogin = async (req, res)=>{
    const errors = validationResult(req)
    const captains= await captainModel.find()
    
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const captain = await captainModel.findOne({email: req.body.email}).select("+password");
    if (!captain) {
        return res.status(400).json({ Error: "Invalid email or password" });
    }
    
    const isValidPassword = await captain.comparePassword(req.body.password);
    if (!isValidPassword) {
        return res.status(400).json({ Error: "Invalid email or password" });
    }
    let token = captain.generateAuthToken();
    res.cookie("token",token)
    return res.status(200).json({ token:token,captain});
}

module.exports.captainProfile = async(req,res)=>{
    res.status(200).json(req.captain)
    
}

module.exports.captainLogout = async(req,res, next)=>{

    res.clearCookie("token")
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    const blackListed=await blackListTokenModel.create({token})
    blackListed.save()
    res.status(200).json({ message: "Logout Sucessfull" });

}  


