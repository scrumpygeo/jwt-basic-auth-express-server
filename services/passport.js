const passport = require('passport');
const User = require('../models/user');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

// Set up options for jwt strategy
// this tell it where to look on request to find key
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: config.secret,
};

// Create Jwt strategy
const jwtLogin = new JwtStrategy(jwtOptions, function (payload, done) {
  //  if user id in payload exists in db, call done with that user else call done without user object (sub = subject btw)
  // below we got 2 types of fail: 1 where search failed to occur and another where search occured and we didn't find user.
  User.findById(payload.sub, function (err, user) {
    if (err) {
      return done(err, false);
    }

    // if u do find a user, return error=null  and also return user
    if (user) {
      done(null, user);
    } else {
      done(null, false);
    }
  });
});

// Tell passport to use this strategy
passport.use(jwtLogin);
