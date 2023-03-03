const joi = require('joi');

const registerValidation = function(data){
    const schema = new joi.object({
        name: joi.string().min(3).required(),
        email: joi.string().min(3).required(),
        password: joi.string().min(3).required()
    })

    return schema.validate(data)
}

const loginValication = function(data){
    const schema = new joi.object({
        eamil: joi.string().min(5).required(),
        password: joi.string().min(5).required()
    })
    return schema.validate(data)
}

module.exports.loginValication = loginValication
module.exports.registerValidation = registerValidation