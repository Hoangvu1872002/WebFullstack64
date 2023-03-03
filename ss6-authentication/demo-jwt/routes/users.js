var express = require('express');
const userModel = require('../model/user.model');
var router = express.Router();
const userRouter = require('../model/user.model');
const { registerValidation } = require('../validation/validation');
const { loginValidation } = require('../validation/validation');
const bcrypt = require('bcrypt');

router.post('/register', async function (req, res) {
  const { error } = registerValidation(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  const emailExists = await userRouter.findOne({ email: req.body.email });

  if (emailExists) {
    return res.status(400).send('email exists');
  }

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);
  const newUser = new userRouter({
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

  const { error } = loginValidation(req.body);
  if (error) {
    res.status(400).send(error.details[0].message)
  }

  const userLogin = await userRouter.findOne({ email: req.body.email });

  if (!userLogin) {
    return res.status(400).send('no find name user');
  }

  const ispasswordLogin = await bcrypt.compare(req.body.password, userLogin.password)
  if (ispasswordLogin) {
    return res.status(400).send(400);
  }
})

module.exports = router;
