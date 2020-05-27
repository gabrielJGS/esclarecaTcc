var Tag_Messages = new Schema({
    _id: {
        type: Number
    },
    userId: {
        type: Schema.Types.ObjectId
    },
    tag: {
        type: String
    },
    message: {
        type: String
    },
    dateTime: {
        type: Date
    }
});