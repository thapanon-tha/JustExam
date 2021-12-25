const utils = require('sequelize');
const Member = require('../services/member.service');

module.exports = {
  delete_member(req, res, next, cid, mid) {
    Member.delete_member(cid, mid)
      .then((response) => {
        utils.writeJson(res, response);
      })
      .catch((response) => {
        utils.writeJson(res, response);
      });
  },

  get_all_member(req, res, next, cid) {
    Member.get_all_member(cid)
      .then((response) => {
        utils.writeJson(res, response);
      })
      .catch((response) => {
        utils.writeJson(res, response);
      });
  },

  put_member(req, res, next, body, cid, mid) {
    Member.put_member(body, cid, mid)
      .then((response) => {
        utils.writeJson(res, response);
      })
      .catch((response) => {
        utils.writeJson(res, response);
      });
  },
};
