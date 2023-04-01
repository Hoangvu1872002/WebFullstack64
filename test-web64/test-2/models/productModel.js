const mongoose = require('mongoose');
const schema = mongoose.Schema;

const productSchema = new schema({
    sku: {
        reuired: true,
        type: String
    }, 
    description: {
        requiered: true,
        type: String 
    },
    instock: {
        required: true,
        type: Number
    }
})

module.exports = mongoose.model('product', productSchema);