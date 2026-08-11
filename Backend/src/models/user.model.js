const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true,
        unique : [true, 'This username already exists']
    },

    email : {
        type : String,
        required : true,
        unique : [true, 'This email address already exists']
    },
    password : {
        type : String,
        required : true,
    }
})

const userModel = mongoose.model('users', userSchema) ;
module.exports = userModel ;