const userModel= require('../models/user.model');


module.exports.createUser = async({ // Pushing the User data in DB
    firstname,lastname,email,password
})=>{
    if(!firstname || !email || !password){
        throw new Error("All Fields are required")
    }
    const user = new userModel({
        fullname:{
            firstname,lastname
        },
        email,
        password
    })

    return user;
}