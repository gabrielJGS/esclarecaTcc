// var Posts_Likes = new Schema({
//     _id: {
//         type: Number
//     },
//     postId: {
//         type: Schema.Types.ObjectId
//     },
//     userId: {
//         type: Schema.Types.ObjectId
//     }
// });


const mongoose = require('mongoose');

const PostsLikesSchema = new mongoose.Schema({
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Posts'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model('Posts', PostsLikesSchema);