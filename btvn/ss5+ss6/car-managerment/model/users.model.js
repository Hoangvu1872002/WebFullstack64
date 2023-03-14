const mongoose = require('mongoose');
const schema = mongoose.Schema();

const userSchema = new schema({
    name: {
        require: true,
        type: String
    },
    email: {
        require: true,
        type: String
    },
    password:{
        require: true,
        type: String
    }
})

module.exports = mongoose.model('user', userSchema)