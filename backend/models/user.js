const bycrypt = require('bcrypt');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  admin: {
    type: Boolean,
    default: false,
  },
});

userSchema.pre('save', async function (next) {
  const hashPassword = await bycrypt
    .hash(this.password, 12);
  this.password = hashPassword;
  next();
});

userSchema.pre('updateOne', async function (next) {
  const hashPassword = await bycrypt
    .hash(this._update.$set.password, 12);
  this.getUpdate().$set.password = hashPassword;
  next();
});

module.exports = mongoose.model('User', userSchema);
