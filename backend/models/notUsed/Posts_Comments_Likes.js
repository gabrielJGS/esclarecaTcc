var Posts_Comments_Likes = new Schema({
    _id: {
        type: Number
    },
    commentId: {
        type: Schema.Types.ObjectId
    },
    userId: {
        type: Schema.Types.ObjectId
    }
});