const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
{
    email: {
        type: String,
        unique: true,
        required: "Email cannot be blank"
    },
    password: {
        type: String,
        required: "Password cannot be blank"
    },
    name: {
        type: String,
        required: "Username cannot be blank",
        trim: true
    },
    scores: {
        type: Number,
        default: 0
    }
},{timestamps: true}); 

module.exports = mongoose.model('User', userSchema)