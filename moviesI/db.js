const mongoose = require('mongoose');

const DB_URL = 'mongodb+srv://admin:admin@moviesdb.swxc6.mongodb.net/movies?retryWrites=true&w=majority'

const connectDB = () => mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

module.exports = {connectDB}