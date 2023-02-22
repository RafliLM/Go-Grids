const mongoose = require('mongoose')

const eventSchema = mongoose.Schema({
    creator: {
        type : String,
        required: true
    },
    title: {
        type : String,
        required : true
    },
    created: {
        type : Date,
        default : Date.now
    },
    participants : {
        type : [{
            username : {
                type : String,
                required : true
            },
            status : {
                type : String,
                enum : ['invited', 'joined'],
                default : 'invited'
            }
        }]
    },
    timeHeld: {
        type : Date,
        validate : (input) => {
            return new Date(input) >= new Date()
        },
        required : true
    }
})

module.exports = mongoose.model('Event', eventSchema, "Events")