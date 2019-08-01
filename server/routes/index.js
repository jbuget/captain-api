const express = require('express');
const router = express.Router();
const models = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pack = require('../package');

router.get('/', (req, res) => {
  res.send({
    name: pack.name,
    version: pack.version,
  });
});

router.get('/token', async (req, res) => {
  const { username: email, password } = req.body;

  const user = await models.user.findOne({ where: { email, status: 'VALIDATED' } });
  if (!user) {
    return res.status(400).send('Unknown account');
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(400).send('Bad password');
  }

  if (user.status === 'CREATED') {
    return res.status(400).send('Invalidated account');
  }

  if (user.status === 'DISABLED') {
    return res.status(400).send('Disabled account');
  }

  if (user.status === 'DELETED') {
    return res.status(400).send('Deleted account');
  }

  const jwtClaims = {
    iss: 'Granny.js',
    sub: user.id,
    name: user.name,
    email: user.email,
  };

  const accessToken = jwt.sign(jwtClaims, 'your_jwt_secret');

  return res.send({
    success: true,
    access_token: accessToken
  });
});

module.exports = router;