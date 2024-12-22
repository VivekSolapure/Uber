const express= require ("express")
const router= express.Router();
const {validation, body} = require("express-validator")
const userController= require("../controllers/user.controller")



router.post('/register',[ // register user with validation
    body('email').isEmail()?.withMessage("Invalid Emailaaa"),
    body('fullname.firstname').isLength({min:3}).withMessage('First name must be alLeast 3 letters long'),
    body('password').isLength({min:5}).withMessage('Password must be alLeast 3 letters long'),

],userController.registerUser) // if validation fails, we will perform action in userController.registerUser function


module.exports = router