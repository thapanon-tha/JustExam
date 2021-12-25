const utils = require('sequelize');
const Member = require('../services/member.service');

module.exports = {

  getAllOptionType(req, res) {
    Member.get_all_member()
      .then((response) => {
        utils.writeJson(res, response);
      })
      .catch((response) => {
        utils.writeJson(res, response);
      });
  },

  addOptionType(req, res) {
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

  getOptionType(req, res) {
    Member.get_all_member()
      .then((response) => {
        utils.writeJson(res, response);
      })
      .catch((response) => {
        utils.writeJson(res, response);
      });
  },

  updateOptionType(req, res) {
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

  deleteOptionType(req, res) {
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
