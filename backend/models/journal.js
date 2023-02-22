const mongoose = require('mongoose');

const gridSchema = new mongoose.Schema({
    question: {
        type : String,
        required : false  
    },
    answer: {
        type : String,
        required : false
    }
})


const postSchema = new mongoose.Schema({
    user_id : mongoose.SchemaTypes.ObjectId,
    grid : {
        type : [gridSchema]
    },
    myfeel : {
        type : String,
        enum : ['angry', 'happy', 'sad']
    },
    date: {
        type: Date,
        default: Date.now
    },
});

postSchema.index({user_id: 1, date: 1}, {unique : true})

module.exports = mongoose.model('Journal', postSchema, "Journals");