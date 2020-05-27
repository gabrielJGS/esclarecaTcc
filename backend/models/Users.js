// const mongoose = require('mongoose');
// var Users = new mongoose.Schema({
//     _id: {
//         type: Number
//     },
//     name: {
//         type: String
//     },
//     email: {
//         type: String
//     },
//     password: {
//         type: String
//     },
//     userPhoto: {
//         type: Schema.Types.Mixed
//     }
// });

// const UsersClass = mongoose.model('Users', Users);
// module.exports = UsersClass;

const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    tags: [String],

    //userPhoto: { Schema.Types.Mixed }
});

module.exports = mongoose.model('Users', UserSchema);