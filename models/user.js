const mongoose = require('mongoose');
const val = require('validator');
const bcrypt = require('bcryptjs');
const { Unauthorized } = require('../errors/Unauthorized');
const { messages } = require('../utils/const');

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator(v) {
          return val.isEmail(v);
        },
        message: messages[400].email,
      },
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    name: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 30,
    },
  },
  { versionKey: false },
);

userSchema.statics.findUserByCredentials = function findUserByCredentials(email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new Unauthorized(messages[401].error);
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new Unauthorized(messages[401].error);
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
