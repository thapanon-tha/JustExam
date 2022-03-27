/* eslint-disable no-param-reassign */
module.exports = {
  inCurrectPath(req) {
    return ({ message: `wrong path: ${req.originalUrl}` });
  },
  querySuccess(data, res) {
    // console.error(err.message);
    const statusCode = 200;
    res.status(statusCode).json(data);
  },

  Success(res) {
    // console.error(err.message);
    const statusCode = 200;
    res.status(statusCode).send();
  },

  Created(data, res) {
    // console.error(err.message);
    const statusCode = 201;
    res.status(statusCode).json(data);
  },
  Unexpected(err, res) {
    // console.error(err.message);
    if (!err.statusCode) err.statusCode = 500;
    res.status(err.statusCode).json({ type: 'Internal Server Error', statusCode: err.statusCode, message: err.message });
  },

  NotFound(err, res) {
    // console.error(err.message);
    if (!err.statusCode) err.statusCode = 404;
    res.status(err.statusCode).json({ type: 'Not Found Error', statusCode: err.statusCode, message: err.message });
  },

  NotAcceptable(err, res) {
    // console.error(err.message);
    if (!err.statusCode) err.statusCode = 406;
    res.status(err.statusCode).send(err.message);
  },

  Validation(err, res) {
    // console.error(err.message);
    if (!err.statusCode) err.statusCode = 422;
    res.status(err.statusCode).json({ type: 'Validation Error', statusCode: err.statusCode, message: err.message });
  },

  Unauthorized(err, res) {
    // console.error(err.message);
    if (!err.statusCode) err.statusCode = 401;
    res.status(err.statusCode).send(err.message);
  },

  NotImplemented(err, res) {
    // console.error(err.message);
    if (!err.statusCode) err.statusCode = 501;
    res.status(err.statusCode).json({ type: 'Not Implemented Error', statusCode: err.statusCode, message: err.message });
  },
};
