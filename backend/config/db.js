var mongoose = require('mongoose');
//mongo "mongodb+srv://esclarecadb-qhunp.gcp.mongodb.net/test" --username <username>
//mongoose.connect('mongodb+srv://esclarecadb-qhunp.gcp.mongodb.net/esclarecaDB?retryWrites=true&w=majority', {
// mongoose.connect('mongodb+srv://esclarecadb-qhunp.gcp.mongodb.net/test --admin admin', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// });

mongoose.connect('mongodb+srv://admin:admin@esclarecadb-qhunp.gcp.mongodb.net/esclarecaDB?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});


module.exports = mongoose