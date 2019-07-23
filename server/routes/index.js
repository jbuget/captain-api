const express = require('express');
const router = express.Router();
const models = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.get('/', (req, res) => {
  res.send('It works!');
});

router.get('/token', async (req, res) => {
  const { username: email, password } = req.body;

  const passwordHash = await bcrypt.hash(password, 10);

  const user = await models.User.findOne({ where: { email } });
  if (!user) {
    return res.status(400).send('Unknown account');
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(400).send('Bad password');
  }

  const jwtUser = {
    id: user.id,
    name: user.name,
    email: user.email,
  };

  const accessToken = jwt.sign(jwtUser, 'your_jwt_secret');

  return res.send({
    success: true,
    access_token: accessToken
  });
});

module.exports = router;