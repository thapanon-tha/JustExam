const utils = require('sequelize');
const User = require('../services/user.service');

module.exports = {

  userLogin(req, res) {
    const { body } = req;

    User.addInventory(body)
      .then((response) => {
        utils.writeJson(res, response);
      })
      .catch((response) => {
        utils.writeJson(res, response);
      });
  },

  userRegister(req, res) {
    const { body } = req;
    User.userRegisterPOST(body)
      .then((response) => {
        utils.writeJson(res, response);
      })
      .catch((response) => {
        utils.writeJson(res, response);
      });
  },

  update(req, res) {
    const { body } = req;
    User.userRegisterPOST(body)
      .then((response) => {
        utils.writeJson(res, response);
      })
      .catch((response) => {
        utils.writeJson(res, response);
      });
  },

};
