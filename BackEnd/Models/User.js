const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
  googleId: String,
  githubId: String,
  facebookId: String,
  username: String,
  firstName: String,
  lastName: String,
  email: { type: String, required: true, unique: true },
  profilePicture: String,
  locale: String,
  password: { type: String, required: function() { return !this.googleId && !this.githubId && !this.facebookId; } }
});

//Hash password before saving the user 
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next()

    try {
      const salt = await bcrypt.genSalt(10)
      this.password =  await bcrypt.hash(this.password, salt) 
    } catch (err) {
      next(err)
    }
})

module.exports = mongoose.model('User', userSchema);
