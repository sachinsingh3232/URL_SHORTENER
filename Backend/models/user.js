const mongoose = require('mongoose')
const Validator = require('validator')
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        validate: [Validator.isEmail, "Invalid Email"],
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        select: true
    },
}, { timestamps: true })

const User = new mongoose.model('User', userSchema);
module.exports = User;