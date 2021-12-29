const Role = require('../services/role.service');
const stdCode = require('./stdCode');

module.exports = {

  async getRole(req, res) {
    try {
      const data = await Role.getAllRole();
      stdCode.querySuccess(data, res);
    } catch (e) {
      stdCode.Unexpected(e, res);
    }
  },

  addRole(req, res) {
    stdCode.NotImplemented(stdCode.inCurrectPath(req), res);
  },

  updateRole(req, res) {
    stdCode.NotImplemented(stdCode.inCurrectPath(req), res);
  },

  deleteRole(req, res) {
    stdCode.NotImplemented(stdCode.inCurrectPath(req), res);
  },
};
