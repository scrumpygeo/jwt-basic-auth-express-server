const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.set('useCreateIndex', true); // stops deprecation warning error for something
// Define our model
const userSchema = new Schema({
  email: { type: String, unique: true, lowercase: true },
  password: String,
});

// Create the model class (load schema into mongoose)
const ModelClass = mongoose.model('user', userSchema);

// Export the model
module.exports = ModelClass;
