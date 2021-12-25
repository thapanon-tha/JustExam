const utils = require('sequelize');
const User = require('../services/user.service');

module.exports = {

  addInventory(req, res, next, body) {
    User.addInventory(body)
      .then((response) => {
        utils.writeJson(res, response);
      })
      .catch((response) => {
        utils.writeJson(res, response);
      });
  },

  userRegisterPOST(req, res, next, body) {
    User.userRegisterPOST(body)
      .then((response) => {
        utils.writeJson(res, response);
      })
      .catch((response) => {
        utils.writeJson(res, response);
      });
  },

};
