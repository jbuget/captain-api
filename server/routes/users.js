const express = require('express');
const router = express.Router();
const models = require('../models');
const bcrypt = require('bcrypt');
const passport = require('passport');
const uuidv5 = require('uuid/v5');

router.get('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
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

  const uuid = uuidv5(email, uuidv5.DNS);
  await models.AccountValidationToken.create({ uuid, user }, { include: ['User'] });

  return res.send(user);
});

router.get('/:user_id', passport.authenticate('jwt', { session: false }), async (req, res) => {
  // TODO improve authorization control
  const userId = (req.params.user_id === 'me') ? req.user.id : req.params.user_id;
  const user = await models.User.findByPk(userId);
  return res.send(user);
});

router.get('/:user_id/teams', passport.authenticate('jwt', { session: false }), async (req, res) => {
  // TODO improve authorization control
  const userId = (req.params.user_id === 'me') ? req.user.id : req.params.user_id;
  const user = await models.User.findByPk(userId, { include: ['teams'] });
  const teams = user.get('teams');
  return res.send(teams);
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

router.post('/account-validation', async (req, res) => {

  const { userId, token } = req.body;

  const accountValidationToken = await models.AccountValidationToken.findOne({ where: { user_id: userId, token } });

  if (!accountValidationToken) {
    return res.status(400).send('Invalid account validation token');
  }

  if (accountValidationToken.used) {
    return res.status(400).send('Token already used');
  }

  const user = await models.User.findByPk(userId);
  if (!user) {
    return res.status(400).send('User not found');
  }

  if (user.status !== 'CREATED') {
    return res.status(400).send('Account already validated');
  }

  user.status = 'VALIDATED';
  user.updatedAt = Date.now();
  await user.save();

  accountValidationToken.used = true;
  accountValidationToken.updatedAt = Date.now();
  await accountValidationToken.save();

  return res.send();
});

module.exports = router;