const express = require('express');
const router = express.Router();
const models = require('../models');
const bcrypt = require('bcrypt');
const passport = require('passport');

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

  return res.send(user);
});

router.get('/:user_id', passport.authenticate('jwt', { session: false }), async (req, res) => {
  // TODO improve authorization control
  try {
    const userId = (req.params.user_id === 'me') ? req.user.id : req.params.user_id;
    const user = await models.User.findByPk(userId, { include: ['teams'] });
    return res.send(user);
  } catch (e) {
    console.error(e);
    return res.status(500);
  }
});

router.get('/:user_id/teams', passport.authenticate('jwt', { session: false }), async (req, res) => {
  // TODO improve authorization control
  const userId = (req.params.user_id === 'me') ? req.user.id : req.params.user_id;
  const teams = await [];
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

module.exports = router;