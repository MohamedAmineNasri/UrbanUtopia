const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  googleId: String,
  githubId: String,
  facebookId: String,
  username: String,
  firstName: String,
  lastName: String,
  email: String,
  profilePicture: String,
  locale: String,
});

module.exports = mongoose.model('User', userSchema);
 