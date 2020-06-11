const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

mongoose.set('useCreateIndex', true); // stops deprecation warning error for something
// Define our model
const userSchema = new Schema({
  email: { type: String, unique: true, lowercase: true },
  password: String,
});

// On save hook, encrypt pwd ++++++++++++++++++++++++++++++++++
//   before saving a model, run this function:
userSchema.pre('save', function (next) {
  //   get access to user model:
  const user = this;

  //  generate a salt then run callback (ie when it's done salting)
  bcrypt.genSalt(10, function (err, salt) {
    if (err) {
      return next(err);
    }

    //   hash the pwd using the salt
    bcrypt.hash(user.password, salt, null, function (err, hash) {
      if (err) {
        return next(err);
      }

      // overwrite plain text password with hash (encrypted pwd)
      user.password = hash;
      // next() means go ahead and save the model- at top we had pre('save' etc) - so once the etc done, save.
      next();
    });
  });
});

userSchema.methods.comparePassword = function (candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
    if (err) {
      return callback(err);
    }

    callback(null, isMatch);
  });
};
// Create the model class (load schema into mongoose)
const ModelClass = mongoose.model('user', userSchema);

// Export the model
module.exports = ModelClass;
