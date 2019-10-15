const express = require('express');
const router = express.Router();
const passport = require('passport');
const models = require('../models');

router.post('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
  return res.send('TODO');
});

module.exports = router;