const utils = require('sequelize');
const Score = require('../services/score.service');

module.exports = {

  getScore(req, res) {
    const { cid, mid } = req.query;
    Score.get_score(cid, mid)
      .then((response) => {
        utils.writeJson(res, response);
      })
      .catch((response) => {
        utils.writeJson(res, response);
      });
  },

  getSummary(req, res) {
    const { cid } = req.query;

    Score.get_summary_score(cid)
      .then((response) => {
        utils.writeJson(res, response);
      })
      .catch((response) => {
        utils.writeJson(res, response);
      });
  },

  addScore(req, res) {
    const { cid, mid } = req.query;
    const { body } = req;
    Score.post_score(body, cid, mid)
      .then((response) => {
        utils.writeJson(res, response);
      })
      .catch((response) => {
        utils.writeJson(res, response);
      });
  },

  updateScore(req, res) {
    const { cid, mid } = req.query;
    const { body } = req;
    Score.put_score(body, cid, mid)
      .then((response) => {
        utils.writeJson(res, response);
      })
      .catch((response) => {
        utils.writeJson(res, response);
      });
  },

};
