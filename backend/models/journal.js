const mongoose = require('mongoose');

const gridSchema = mongoose.Schema({
    question: {
        type : String,
        required : false  
    },
    answer: {
        type : String,
        required : false
    }
})

const feelSchema = mongoose.Schema({
    status: {
        type : String,
        enum : ['angry', 'happy', 'sad']
    }
})

const postSchema = mongoose.Schema({
    user_id : mongoose.SchemaTypes.ObjectId,
    grid : {
        type : [gridSchema]
    },
    grid2 : {
        type : [gridSchema]
    },
    grid3 : {
        type : [gridSchema]
    },
    grid4 : {
        type : [gridSchema]
    },
    grid5 : {
        type : [gridSchema]
    },
    grid6 : {
        type : [gridSchema]
    },
    myfeel : {
        type : [feelSchema]
    },
    created: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('Journal', postSchema, "Journals");