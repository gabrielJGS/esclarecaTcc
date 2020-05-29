var Posts_Tags = new Schema({
    _id: {
        type: Number
    },
    postId: {
        type: Schema.Types.ObjectId
    },
    tag: {
        type: String
    }
});