const mongoose = require('mongoose');

const SlacksSchema = new mongoose.Schema({
    title: String,
    postedIn: Date,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    },
});

module.exports = mongoose.model('Slacks', SlacksSchema);