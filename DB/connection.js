const mongoose = require('mongoose');

const connectDB = () => 
    mongoose.connect(process.env.URL, { 
        useNewUrlParser: true, 
        useUnifiedTopology: true 
    });



module.exports = connectDB;