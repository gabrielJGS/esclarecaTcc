// var Posts_Comments = new Schema({
//     _id: {
//         type: Number
//     },
//     postId: {
//         type: Schema.Types.ObjectId
//     },
//     userId: {
//         type: Schema.Types.ObjectId
//     },
//     message: {
//         type: String
//     }
// });


const mongoose = require('mongoose');

const Posts_CommentsSchema = new mongoose.Schema({
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Posts'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    }],
    postedIn: Date,
    message: String,
    solvedPost: Boolean
});

module.exports = mongoose.model('Posts_Comments', Posts_CommentsSchema);