const mongoose = require('mongoose');

const DB_URL = 'mongodb+srv://admin:admin@moviedb.htse8.mongodb.net/MovieDB?retryWrites=true&w=majority'

const connectDB = () => mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

module.exports = {connectDB}