const mongoose = require("mongoose")

//Creating a schema for storing the blacklisted token
const blackListTokenSchema = new mongoose.Schema({
    token:{
        type: String,
        required: true,
        unique: true
    },

    createdAt:{
        type: Date,
        default: Date.now,
        expires: 86400 // 24 hrs
    }
})

module.exports = mongoose.model("BlackListToken", blackListTokenSchema);