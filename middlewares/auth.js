const jwt = require('jsonwebtoken');
const { Unauthorized } = require('../errors/index');
const { messages } = require('../utils/const');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new Unauthorized(messages[401].need));
  }

  const token = authorization.replace('Bearer ', '');

  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    return next(new Unauthorized(messages[401].need));
  }
  req.user = payload;

  return next();
};
