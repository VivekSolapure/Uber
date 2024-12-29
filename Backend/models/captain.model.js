const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const captainSchema = new mongoose.Schema({
    fullname: {
        firstname: {
            minlength:[3, 'First name must be at least 3 characters long'],
            required: true,
            type: String,
        },
        lastname: {
            type: String,
            minlength:[3, 'First name must be at least 3 characters long'],
        },

    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please fill valid email address"]
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    socketId: {
        type: String,
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: "inactive"
    },
    vehicle: {
        color: {
            type: String,
            required: true,
            minlength: [3, "Color must be atleast 3 characters long"],
        },
        plate: {
            type: String,
            required: true,
            minlength: [3, "Plate number must be atleast 3 characters long"],
        },
        capacity: {
            type: Number,
            required: true,
            minlength: [1, "Capacity must be atleast 1"],
        },
        vehicleType: {
            type: String,
            required: true,
            enum: ["car", "motercycle", "auto"]
        }
    },
    location: {
        lat: {
            type: Number,
        },
        lng: {
            type: Number,
        }

    }

})

captainSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SCRET, { expiresIn: "24h" })
    return token;
}

captainSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}

captainSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10);
}

const captainModel = mongoose.model("captain", captainSchema)


module.exports = captainModel;