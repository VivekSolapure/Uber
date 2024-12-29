const express = require("express")
const router = express.Router();
const {body} = require("express-validator")
const captainController = require("../controllers/captain.controller")


router.post('/register',[
    body('email').isEmail()?.withMessage("Invalid Email"),
    body('password').isLength({min:5}).withMessage("Password must be at least 5 letters long "),
    body("fullname.firstname").isLength({min:3}).withMessage("Firstname must be at least 3 letters long"),
    body("vehicle.color").isLength({min:3}).withMessage("Color must be at least 3 letters long"),
    body("vehicle.plate").isLength({min:3}).withMessage("Plate must be atleast 3 letters long"),
    body("vehicle.capacity").isLength({min:1}).withMessage("Capacity must be atleast 1 letters long"),
    body("vehicle.vehicleType").isIn(["car", "motercycle","auto"]).withMessage("Model must be atleast 3 letters long"),


],captainController.registerCaptain ) 

module.exports = router;
