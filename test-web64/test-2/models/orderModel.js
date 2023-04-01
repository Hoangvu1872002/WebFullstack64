const mongoose = require('mongoose');
const schema = mongoose.Schema;

const orderSchema = new schema({
    item: {
        reuired: true,
        type: String
    }, 
    price: {
        requiered: true,
        type: Number 
    },
    quantity: {
        required: true,
        type: String
    }
})

module.exports = mongoose.model('order', orderSchema);