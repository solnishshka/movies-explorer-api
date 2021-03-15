const { celebrate, Joi } = require('celebrate');
const validator = require('validator');
const { messages } = require('../../utils/const');

module.exports.signupValidator = celebrate({
  body: {
    name: Joi.string().required().min(2).max(30)
      .messages({
        'string.min': messages[400].min2,
        'string.max': messages[400].max,
        'string.required': messages[400].required,
      }),
    email: Joi.string().required().custom((value, helper) => {
      if (validator.isEmail(value)) {
        return value;
      }
      return helper.message(messages[400].email);
    }).messages({
      'any.required': messages[400].required,
    }),
    password: Joi.string().min(8).max(30).required()
      .messages({
        'string.min': messages[400].min,
        'string.max': messages[400].max,
        'string.required': messages[400].required,
      }),
  },
});

module.exports.signinValidator = celebrate({
  body: {
    email: Joi.string().required().custom((value, helper) => {
      if (validator.isEmail(value)) {
        return value;
      }
      return helper.message(messages[400].email);
    }).messages({
      'any.required': messages[400].required,
    }),
    password: Joi.string().min(8).max(30).required()
      .messages({
        'string.min': messages[400].min,
        'string.max': messages[400].max,
        'string.required': messages[400].required,
      }),
  },
});
