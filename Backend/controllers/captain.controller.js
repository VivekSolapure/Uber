const captainModel = require("../models/captain.model")
const { validationResult } = require('express-validator');
const captainService = require("../services/captain.service")

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