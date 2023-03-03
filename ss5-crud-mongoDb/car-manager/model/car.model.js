const mongoose = require('mongoose');
const schema = mongoose.Schema;

const carSchema = new schema({
    name: String,
    manufacturer: String,
    price: Number
});

module.exports = mongoose.model('car', carSchema);