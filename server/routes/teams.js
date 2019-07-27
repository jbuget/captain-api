const express = require('express');
const router = express.Router();
const passport = require('passport');
const models = require('../models');

router.post('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const { name, description } = req.body;
  const team = await models.Team.create({ name, description });
  await team.addMember(req.user, { through: { role: 'ADMIN' } });
  return res.send(team);
});

module.exports = router;