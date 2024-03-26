const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: "student"
    },
    department: {
        type: String,
        default: ""
    },
    score: {
        type: Number,
        default: 0
    },
    liked:{
        type: Array,
        default: []
    }
},{timestamps:true});

const UserModel = mongoose.model("users", UserSchema);
module.exports = UserModel;
