const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    fullname:{
        firstname:{
            type:String,
            required:true,
            minlength:[3,"First name must be at least 3 characters long"]
        },
        lastname:{
            type:String,
            minlength:[3,"First name must be at least 3 characters long"]
        }
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        select:false
    },
    sockerID:{
        tupe:"String"
    }
})

userSchema.methods.generateAuthToken = function(){//Generating auth token
    const token= jwt.sign({_id:this._id},process.env.JWT_SCRET);
    return token;
}


userSchema.methods.comparePasswprd = async function(password){//Generating auth token
    return await bcrypt.compare(password, this.password)
}

userSchema.statics.hashPassword= async function(password){
    return await bcrypt.hash(password, 10)
}


const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
