const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        trim: true
    },
    lastname: {
        type: String,
        required: true,
        trim: true
    },
    username: {
        type: String,
        required: true,
        minlength: 9,
        unique: true,
        trim: true
    },
    profilePicture: {
        type: String
    },
    email: {
        type: String,
        required: true,
        match:  /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('User', userSchema, "Users")