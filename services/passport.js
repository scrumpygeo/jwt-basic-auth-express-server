const passport = require('passport');
const User = require('../models/user');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');

// Create local strategy +++++++++++++++++++++++++++++++++++++++
// default expects username but we are using email so we need to tell it so (it expects password so no need to do anything else):
const localOptions = { usernameField: 'email' };
const localLogin = new LocalStrategy(localOptions, function (
  email,
  password,
  done
) {
  // verify this username (email) and pwd; call done with user if correct else call done with false.
  User.findOne({ email: email }, function (err, user) {
    if (err) {
      return done(err);
    }
    if (!user) {
      return done(null, false);
    }

    // now compare pwds
    user.comparePassword(password, function (err, isMatch) {
      if (err) {
        return done(err);
      }
      if (!isMatch) {
        return done(null, false);
      }

      return done(null, user);
    });
  });
});

// Set up options for jwt strategy
// this tell it where to look on request to find key
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: config.secret,
};

// Create Jwt strategy +++++++++++++++++++++++++++++++++++++++++++++++++======
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
// Tell passport to use the strategies (there are 2):
passport.use(jwtLogin);
passport.use(localLogin);
