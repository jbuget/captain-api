
const models = require('./models');

/* Passport */

/*
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
  function(username, password, done) {
    models.User.findOne({ email: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));
*/

/* Express */

const express = require('express');

const app = express();

app.get('/', function (req, res) {
  res.send('Hello World!')
});

app.get('/users', (req, res) => {
  return models.User.findAndCountAll().then((result) => {
    res.send(result.rows);
  });
});

// 404
app.use(function(req, res, next) {
  res.status(404).send('Sorry cant find that!');
});

// 5XX
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});
