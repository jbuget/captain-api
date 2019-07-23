const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const models = require('./models');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));

/* Passport */

const passport = require('passport');
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');

const passportOpts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'your_jwt_secret',
  issuer: 'accounts.granny.js',
  audience: 'granny.js',
};

passport.use(new JwtStrategy(passportOpts, async (jwtPayload, done) => {
  const user = await models.User.findByPk(jwtPayload.sub);
  if (!user) {
    return done(null, false);
  }
  return done(null, user);
}));

app.use(passport.initialize());

/* Express */

// 404
app.use((req, res, next) => {
  res.status(404).send('Sorry cant find that!');
});

// 5XX
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

module.exports = app;