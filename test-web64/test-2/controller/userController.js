const asyncModel = require('express-async-handler');
const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken');


const authLogin = asyncModel(async (req, res) => {
    console.log("aaaaaaaaa")
    const userNameExists = await userModel.findOne({
        userName: req.body.userName
    });

    if (!userNameExists) {
        res.status(400);
        throw new Error('user name khong ton tai!');
    } else {
        console.log("aaaaaaaaa")
        if (req.body.password === userNameExists.password) {
            res.json({
                _id: userNameExists.id,
                userName: userNameExists.userName, 
                token: jwt.sign({ _id: userNameExists.id }, 'masobimat')
            });
        } else {
            res.status(401);
            throw new Error('mat khau khong dung!');
        }
    }

});

module.exports = {   
    authLogin,
}