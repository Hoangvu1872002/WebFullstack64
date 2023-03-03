const mongoose = require('mongoose')
const userSchema = mongoose.Schema

const user = new userSchema({
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

module.exports = mongoose.model('user', user)