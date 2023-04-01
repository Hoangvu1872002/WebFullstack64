const asyncModel = require('express-async-handler');
const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const userRegister = asyncModel(async (req, res) => {

    const userFind = await userModel.findOne({
        email: req.body.email
    });

    if (userFind) {
        res.status(400);
        throw new Error('email da ton tai!')
    } else {
        const newUser = new userModel({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        });

        const userInsert = await userModel.create(newUser);

        if (userInsert) {
            res.status(200).json({
                _id: newUser.id,
                name: newUser.name,
                email: newUser.email,
                isAdmin: newUser.isAdmin,
                token: jwt.sign({ _id: newUser.id }, 'masobimat')
            })
        } else {
            res.status(400);
            throw new Error('dang ki that bai!');
        }
    }
});

const authLogin = asyncModel(async (req, res) => {

    const emailExists = await userModel.findOne({
        email: req.body.email
    });

    if (!emailExists) {
        res.status(400);
        throw new Error('email khong ton tai!');
    } else {
        if (await bcrypt.compare(req.body.password, emailExists.password)) {
            res.json({
                _id: emailExists.id,
                name: emailExists.name, 
                email: emailExists.email,
                isAdmin: emailExists.isAdmin,
                token: jwt.sign({ _id: emailExists.id }, 'masobimat')
            });
        } else {
            res.status(401);
            throw new Error('mat khau khong dung!');
        }
    }

});

const getUserProfile = asyncModel(async (req, res) => {

    const getProfile = await userModel.findById({ _id: req.user.id }).select('-password');

    if (getProfile) {
        res.json(getProfile);
    } else {
        res.status(401);
        throw new Error('mat khau sai!');
    }

});

const updateUserProfile = asyncModel(async (req, res) => {
    
    try {
        
        const  user = userModel.findOne(req.params.id);

        user.name = req.body.name;
        user.email = req.body.email;
        user.password = req.body.password;

        await user.save();
        
        const userUpdate = await userModel.findById({ _id: req.user.id }).select('-password');
        res.json(userUpdate);

    } catch (e) {
        console.log(e);
        res.status(401);
        throw new Error('khong the cap nhat!');
    }
})

const getAllUser = asyncModel(async (req, res) => {
    const users = await userModel.find({});
    res.json(users);
});

const deleteUser = asyncModel(async (req, res) => {

const check = req.params.id.match(/^[0-9a-fA-F]{24}$/) ;
console.log(check)
    if (check) {
        const userDelete = await userModel.findOne({_id: req.params.id});
        if(userDelete){
            try {
                await userModel.deleteOne({
    
                    _id: req.params.id
                })
                res.status(200).send("thanh cong!");
            } catch (error) {
                res.send('loi!');
            }
        }else{
            res.status(401);
            throw new Error('Khong tim thay id!');
        }
    } else {
        res.status(401);
            throw new Error('Khong tim thay id!');
    }
})

const getUser = asyncModel(async (req, res)=>{
    if(req.params.id.match(/^[0-9a-fA-F]{24}$/)){
        const user = await userModel.findOne({
            _id: req.params.id
        }).select('-password');
        if(user){
            res.json(user);
        }else{
            res.status(401);
            throw new Error('Khong tim thay id!');
        }
    }else{
        res.status(401);
            throw new Error('Khong tim thay id!');
    }
})

const updateUser = asyncModel(async (req,res)=>{
    if(req.params.id.match(/^[0-9a-fA-F]{24}$/)){
        const user = await userModel.findOne({
            _id: req.params.id
        })
        if(user){
            try {
                 user.name = req.body.name;
                 user.email = req.body.email ;
                 user.password =  req.body.password;
                 await user.save();
                 const userUpdate = await userModel.findById({ _id: req.params.id }).select('-password');
                 res.json(userUpdate);
            } catch (error) {
                res.status(401);
            throw new Error('cap nhat khong thanh cong!');
            }
        }else{
            res.status(401);
            throw new Error('Khong tim thay id abc!');
        }
    }else{
        res.status(401);
            throw new Error('Khong tim thay id!');
    }
})
module.exports = {
    userRegister,
    authLogin,
    getUserProfile,
    updateUserProfile,
    getAllUser,
    deleteUser,
    getUser,
    updateUser
}

