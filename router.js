const Authentication = require('./controllers/authentication');
const passportService = require('./services/passport');
const passport = require('passport');

// when u authenticate, don't do default and make a session bcos we are using tokens instead.
// -& so for any route we want to protect with authentication we will use the requireAuth helper below:
const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

module.exports = function (app) {
  app.get('/', requireAuth, function (req, res) {
    res.send({ hi: 'there' });
  });

  // before user can go to signin route handler, we requireSignin:
  app.post('/signin', requireSignin, Authentication.signin);
  // for /signup run method Authentication.signup:
  app.post('/signup', Authentication.signup);
};
