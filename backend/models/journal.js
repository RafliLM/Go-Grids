const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    user_id : mongoose.SchemaTypes.ObjectId,
    question_1: String,
    question_2: String,
    question_3: String,
    question_4: String,
    question_5: String,
    question_6: String,
    my_feel: String,
    created: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('Journal', postSchema);