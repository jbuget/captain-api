const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

require('./models');
require('./config/passport');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));
app.use('/teams', require('./routes/teams'));

/* Passport */

const passport = require('passport');
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