const { InternalError } = require('../errors/index');
const { messages } = require('../utils/const');

module.exports = (err, req, res, next) => {
  if (err.status) {
    return res.status(err.status).send({ message: err.message });
  }
  const error = new InternalError(messages.default);
  return res.status(error.status).send({ message: error.message });
};
