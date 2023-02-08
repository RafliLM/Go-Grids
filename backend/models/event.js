const mongoose = require('mongoose')

const participantSchema = mongoose.Schema({
    username: {
        type : String,
        required : true   
    },
    status: {
        type : String,
        enum : ['invited', 'joined'],
        default : 'invited'
    }
})

const eventSchema = mongoose.Schema({
    creator: {
        type : String,
        required: true
    },
    event: {
        type : String,
        required : true
    },
    created: {
        type : Date,
        default : Date.now
    },
    timeHeld: {
        type : Date,
        required : function (value) {
            return value > Date.now
        }
    }
})

module.exports = mongoose.model('Event', eventSchema, "Events")