module.exports = {
  Unexpected(err, res) {
    // console.error(err.message);
    if (!err.statusCode) err.statusCode = 500;
    res.status(err.statusCode).send(err.message);
  },

  NotFound(err, res) {
    // console.error(err.message);
    if (!err.statusCode) err.statusCode = 404;
    res.status(err.statusCode).send(err.message);
  },

  NotAcceptable(err, res) {
    // console.error(err.message);
    if (!err.statusCode) err.statusCode = 406;
    res.status(err.statusCode).send(err.message);
  },

  Validation(err, res) {
    // console.error(err.message);
    if (!err.statusCode) err.statusCode = 422;
    res.status(err.statusCode).send(err.message);
  },

  Unauthorized(err, res) {
    // console.error(err.message);
    if (!err.statusCode) err.statusCode = 401; // If err has no specified error code, set error code to 'Internal Server Error (500)'
    res.status(err.statusCode).send(err.message);
  },
};
