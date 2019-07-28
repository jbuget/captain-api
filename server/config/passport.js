const passport = require('passport');
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');

const models = require('../models');

const passportOpts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'your_jwt_secret',
  issuer: 'Granny.js',
};

passport.use(new JwtStrategy(passportOpts, async (jwtPayload, done) => {
  const user = await models.user.findByPk(jwtPayload.sub);
  if (!user) {
    return done(null, false);
  }
  return done(null, user);
}));
