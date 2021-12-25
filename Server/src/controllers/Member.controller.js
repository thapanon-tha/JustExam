const utils = require('sequelize');
const Member = require('../services/member.service');

module.exports = {

  getMember(req, res) {
    const { cid } = req.query;

    Member.get_all_member(cid)
      .then((response) => {
        utils.writeJson(res, response);
      })
      .catch((response) => {
        utils.writeJson(res, response);
      });
  },

  updateMember(req, res) {
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

  deleteMember(req, res) {
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
