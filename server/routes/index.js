const express = require('express');
const router = express.Router();
const models = require('../models');
const bcrypt = require('bcrypt');

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
  return res.send('Yeah!');
});

module.exports = router;