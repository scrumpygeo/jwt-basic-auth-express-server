module.exports = function (app) {
  app.get('/', function (req, res, next) {
    res.send(['nick-nack', 'paddy-wack', 'give-the-dog-a-bone']);
  });
};
