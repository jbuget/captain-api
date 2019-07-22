var models = require('../models');
var express = require('express');
var router = express.Router();

router.get('/', async (req, res) => {
  const users = await models.User.findAll();
  res.send(users);
});

router.post('/', async (req, res) => {
  await models.User.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
  });
  res.redirect('/');
});

router.get('/:user_id', async (req, res) => {
  const user = await models.User.findOne({ where: { id: req.params.user_id } });
  res.send(user);
});

router.delete('/:user_id', async (req, res) => {
  await models.User.destroy({
    where: {
      id: req.params.user_id
    }
  });
  res.redirect('/');
});

module.exports = router;