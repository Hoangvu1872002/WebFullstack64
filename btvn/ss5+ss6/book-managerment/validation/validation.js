const joi = require('joi');

const registerValidation = function (data) {
    const schema = new joi.object({
        name: joi.string().min(3).required(),
        email: joi.string().min(3).required(),
        password: joi.string().min(3).required()
    })
    return schema.validate(data)
}

const loginValidation = function (data) {
    const schema = new joi.object({
        email: joi.string().min(3).required(),
        password: joi.string().min(3).required()
    })
    return schema.validate(data)
}
module.exports.registerValidation = registerValidation
module.exports.loginValidation = loginValidation