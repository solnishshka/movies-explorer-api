const { celebrate, Joi } = require('celebrate');
const validator = require('validator');
const { messages } = require('../../utils/const');

module.exports.createMovieValidator = celebrate({
  body: {
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().custom((value, helper) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helper.message(messages[400].url);
    }),
    trailer: Joi.string().required().custom((value, helper) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helper.message(messages[400].url);
    }),
    thumbnail: Joi.string().required().custom((value, helper) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helper.message(messages[400].url);
    }),
    movieId: Joi.string().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  },
});

module.exports.movieIdValidator = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().required().min(24).max(24)
      .hex()
      .messages({
        'string.min': messages[400].minmax24,
        'string.max': messages[400].minmax24,
        'string.hex': messages[400].id,
        'any.required': messages[400].required,
      }),
  }),
});
