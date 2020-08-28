const mongoose = require('mongoose');

const Slacks_MessagesSchema = new mongoose.Schema({
    slack: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Slacks'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    },
    postedIn: Date,
    message: String,
});

module.exports = mongoose.model('Slacks_Messages', Slacks_MessagesSchema);