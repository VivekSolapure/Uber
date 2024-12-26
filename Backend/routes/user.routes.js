const express = require("express")
const router = express.Router();
const { validation, body } = require("express-validator")
const userController = require("../controllers/user.controller")
const authMiddleware = require("../middleware/auth.middleware")



router.post('/register', [ // register user with validation
    body('email').isEmail()?.withMessage("Invalid Email"),
    body('fullname.firstname').isLength({ min: 3 }).withMessage('First name must be alLeast 3 letters long'),
    body('password').isLength({ min: 5 }).withMessage('Password must be alLeast 5 letters long'),

], userController.registerUser) // we will perform action in userController.registerUser function


router.get('/login', [ // login user with validation
    body('email').isEmail()?.withMessage("Invalid Email"),
    body('password').isLength({ min: 5 }).withMessage('Password is alLeast 5 letters long'),

], userController.loginUser) //  we will perform action in userController.loginUser function

router.get('/profile', authMiddleware.isLogin, userController.getUserProfile)// this is for getting the user profile information which is only accessible after login

router.get('/logout', authMiddleware.isLogin, userController.logoutUser)

//before creating logout route , we need to create logout middleware where we need to handle the black list the token which the token 
// who are logged out, so for storing the we are using ttl (time to live) instead of storing it in the DB
// creating logout route with jwt is little bit treaky

module.exports = router