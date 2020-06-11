// logic to process request goes here

const User = require('../models/user');

exports.signup = function (req, res, next) {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    return res
      .status(422)
      .send({ error: 'You must provide email and password' });
  }

  // 1. see if user exists  (below User is class representing ALL users)
  // if user doesn't exist, existingUser will be null
  User.findOne({ email: email }, function (err, existingUser) {
    if (err) {
      return next(err);
    }

    // 2. if user exists, return error:   [error code 422 = unprocessable entity]
    if (existingUser) {
      return res.status(422).send({ error: 'Email is in use' });
    }

    // 3. if user doesnt exist, create and save new user record.
    const user = new User({
      email: email,
      password: password,
    });

    // otherwise it's not saved! Pass callback so we can be told when user saved
    user.save(function (err) {
      if (err) {
        return next(err);
      }

      // 4. respond to request informing user was created
      res.json({ success: true });
    });
  });
};
