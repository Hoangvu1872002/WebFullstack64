var express = require('express');
var router = express.Router();

const { registerValidation, loginValidation } = require('../validation/validation')
const usersRouter = require('../model/users.model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

router.post('/register', async function (req, res) {

  const { error } = registerValidation(req.body);
  if (error) {
    return res.status(404).send(error.details[0].message)
  }

  const emailExists = await usersRouter.findOne({ email: req.body.email })
  if (emailExists) {
    res.status(400).send('email exists!');
  }
  

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);
  const newUser = new usersRouter({
    name: req.body.name,
    email: req.body.email,
    password: hashPassword
  })

  try {
    const user = await newUser.save();
    res.send(user)
  } catch (error) {
    res.status(404).send('error')
  }
})


router.post('/login', async function (req, res) {

  const {error} = loginValidation(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message)
  }

  const userLogin = await usersRouter.findOne({ email: req.body.email })

  if (!userLogin) {
    return res.status(400).send('email not exsits!')
  }

  const ispasswordLogin = await bcrypt.compare(req.body.password, userLogin.password)
  if (!ispasswordLogin) {
    return res.status(400).send('password not exsist!');
  }

  const token = jwt.sign({ _id: userLogin._id }, 'mabimat')
  res.header('authToken', token).send(token);
})

module.exports = router;
