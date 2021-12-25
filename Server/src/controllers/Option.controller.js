const utils = require('sequelize');
const Member = require('../services/member.service');

module.exports = {

  getOption(req, res) {
    Member.get_all_member()
      .then((response) => {
        utils.writeJson(res, response);
      })
      .catch((response) => {
        utils.writeJson(res, response);
      });
  },

  addOption(req, res) {
    const { body } = req;
    const { cid } = req.query;
    Member.put_member(body, cid)
      .then((response) => {
        utils.writeJson(res, response);
      })
      .catch((response) => {
        utils.writeJson(res, response);
      });
  },

  updateOption(req, res) {
    const { body } = req;
    const { cid, mid } = req.query;
    Member.put_member(body, cid, mid)
      .then((response) => {
        utils.writeJson(res, response);
      })
      .catch((response) => {
        utils.writeJson(res, response);
      });
  },

  deleteOption(req, res) {
    const { cid, mid } = req.query;

    Member.delete_member(cid, mid)
      .then((response) => {
        utils.writeJson(res, response);
      })
      .catch((response) => {
        utils.writeJson(res, response);
      });
  },
};
