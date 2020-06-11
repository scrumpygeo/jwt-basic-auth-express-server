const Authentication = require('./controllers/authentication');

module.exports = function (app) {
  // for /signup run method Authentication.signup:
  app.post('/signup', Authentication.signup);
};
