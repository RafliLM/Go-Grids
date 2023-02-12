const mongoose = require('mongoose');

const gridSchema = mongoose.Schema({
    question: {
        type : String,
        required : true   
    },
    answer: {
        type : String,
        required : true 
    }
})

const postSchema = mongoose.Schema({
    user_id : mongoose.SchemaTypes.ObjectId,
    grid : {
        type : [gridSchema]
    },
    my_feel: String,
    created: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('Journal', postSchema, "Journals");