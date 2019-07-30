const express = require('express');
const router = express.Router();
const models = require('../models');
const bcrypt = require('bcrypt');
const passport = require('passport');
const uuidv5 = require('uuid/v5');

router.get('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const users = await models.user.findAll();
  return res.send(users);
});

router.post('/', async (req, res) => {

  const { name, email, password } = req.body;

  const userMatchingEmail = await models.user.findOne({ where: { email } });

  if (userMatchingEmail) {
    return res.status(400).send('Existing account');
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const user = await models.user.create({ name, email, password: passwordHash, });

  const uuid = uuidv5(email, uuidv5.DNS);
  await models.accountValidationToken.create({ uuid, userId: user.id });

  return res.send(user);
});

router.get('/:user_id', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const queryParamUserId = req.params.user_id;
  if (queryParamUserId !== 'me' && queryParamUserId !== req.user.id.toString()) {
    return res.status(403).send('Not allowed');
  }
  return res.send(req.user);
});

router.patch('/:user_id', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const queryParamUserId = req.params.user_id;
  if (queryParamUserId !== 'me' && queryParamUserId !== req.user.id.toString()) {
    return res.status(403).send('Not allowed');
  }
  const user = req.user;
  for (let attribute in req.body) {
    user[attribute] = req.body[attribute];
  }
  await user.save();

  return res.send(user);
});

router.get('/:user_id/teams', passport.authenticate('jwt', { session: false }), async (req, res) => {
  // TODO improve authorization control
  const userId = (req.params.user_id === 'me') ? req.user.id : req.params.user_id;
  const user = await models.user.findByPk(userId, { include: ['teams'] });
  const teams = user.get('teams');
  return res.send(teams);
});

router.post('/:user_id/password-reset', async (req, res) => {
  return res.send('TODO');
});

router.delete('/:user_id', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const queryParamUserId = req.params.user_id;
  if (queryParamUserId !== 'me' && queryParamUserId !== req.user.id.toString()) {
    return res.status(403).send('Not allowed');
  }

  const user = req.user;
  user.name = `user_${user.id}`;
  user.email = `email_${user.id}`;
  user.password = `password_${user.id}`;
  user.status = 'DELETED';

  await user.save();

  return res.redirect('/');
});

router.post('/account-validation', async (req, res) => {

  const { userId, uuid } = req.body;

  const accountValidationToken = await models.accountValidationToken.findOne({ where: { user_id: userId, uuid } });

  if (!accountValidationToken) {
    return res.status(400).send('Invalid account validation token');
  }

  if (accountValidationToken.used) {
    return res.status(400).send('Token already used');
  }

  const user = await models.user.findByPk(userId);
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