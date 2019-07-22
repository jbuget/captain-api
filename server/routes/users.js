const express = require('express');
const router = express.Router();
const models = require('../models');
const bcrypt = require('bcrypt');

router.get('/', async (req, res) => {
  const users = await models.User.findAll();
  return res.send(users);
});

router.post('/', async (req, res) => {

  const { name, email, password } = req.body;

  const userMatchingEmail = await models.User.findOne({ where: { email } });

  if (userMatchingEmail) {
    return res.status(400).send('Existing account');
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const user = await models.User.create({ name, email, password: passwordHash, });

  return res.send(user);
});

router.get('/:user_id', async (req, res) => {
  const user = await models.User.findByPk(req.params.user_id);
  return res.send(user);
});

router.post('/:user_id/password-reset', async (req, res) => {
  return res.send('TODO');
});

router.delete('/:user_id', async (req, res) => {
  await models.User.destroy({
    where: {
      id: req.params.user_id
    }
  });
  return res.redirect('/');
});

module.exports = router;