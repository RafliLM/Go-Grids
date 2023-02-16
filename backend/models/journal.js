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


const postSchema = mongoose.Schema({
    user_id : mongoose.SchemaTypes.ObjectId,
    grid : {
        type : [gridSchema]
    },
    myfeel : {
        type : String,
        enum : ['angry', 'happy', 'sad']
    },
    created: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('Journal', postSchema, "Journals");