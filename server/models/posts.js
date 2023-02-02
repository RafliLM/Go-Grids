const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    user_id : mongoose.SchemaTypes.ObjectId,
    grid1: String,
    grid2: String,
    grid3: String,
    grid4: String,
    grid5: String,
    grid6: String,
    // image: String,
    created: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('Post', postSchema);