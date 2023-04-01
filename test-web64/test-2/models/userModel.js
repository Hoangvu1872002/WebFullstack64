const mongoose = require('mongoose');
const schema = mongoose.Schema;

const userSchema = new schema({
    userName: {
        reuired: true,
        type: String
    }, 
    password: {
        required: true,
        type: String
    },
})

module.exports = mongoose.model('user', userSchema);