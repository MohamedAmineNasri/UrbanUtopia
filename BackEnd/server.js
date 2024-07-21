const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.DATABASE);

mongoose.connection.on('error', (err) => {
    console.log('Mongoose Connection ERROR: ' + err.message);
});



module.exports = mongoose;
