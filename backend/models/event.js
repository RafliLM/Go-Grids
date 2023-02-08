const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const participantSchema = mongoose.Schema({
    
})

const eventSchema = mongoose.Schema({
    creator: {
        type : String,
        required: true
    }
})

module.exports = mongoose.model('Event', eventSchema, "Events")