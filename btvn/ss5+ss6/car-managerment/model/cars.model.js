const mongoose = require('mongoose');
const carsSchema = mongoose.Schema;

const carSchema = new carsSchema({
    name: String,
    manufacturer: String,
    price: Number
})

module.exports = mongoose.model('cars', carSchema)