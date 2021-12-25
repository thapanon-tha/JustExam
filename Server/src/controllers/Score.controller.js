const utils = require('sequelize');
const Score = require('../services/score.service');

module.exports = {
  get_score(req, res, next, cid, mid) {
    Score.get_score(cid, mid)
      .then((response) => {
        utils.writeJson(res, response);
      })
      .catch((response) => {
        utils.writeJson(res, response);
      });
  },

  get_summary_score(req, res, next, cid) {
    Score.get_summary_score(cid)
      .then((response) => {
        utils.writeJson(res, response);
      })
      .catch((response) => {
        utils.writeJson(res, response);
      });
  },

  post_score(req, res, next, body, cid, mid) {
    Score.post_score(body, cid, mid)
      .then((response) => {
        utils.writeJson(res, response);
      })
      .catch((response) => {
        utils.writeJson(res, response);
      });
  },

  put_score(req, res, next, body, cid, mid) {
    Score.put_score(body, cid, mid)
      .then((response) => {
        utils.writeJson(res, response);
      })
      .catch((response) => {
        utils.writeJson(res, response);
      });
  },

};
