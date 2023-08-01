const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 4,
    },
    isAdmin: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

const User = mongoose.model('User', UserSchema);
module.exports = { User };
