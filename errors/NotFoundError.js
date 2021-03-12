class NotFoundError extends Error {
  constructor(message) {
    super();
    this.message = message;
    this.status = 404;
  }
}

module.exports = {
  NotFoundError,
};
