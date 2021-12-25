const utils = require('sequelize');
const Score = require('../services/score.service');

module.exports = {

  getSectionTime(req, res) {
    const { cid, mid } = req.query;
    Score.get_score(cid, mid)
      .then((response) => {
        utils.writeJson(res, response);
      })
      .catch((response) => {
        utils.writeJson(res, response);
      });
  },

  addSectionTime(req, res) {
    const { cid } = req.query;

    Score.get_summary_score(cid)
      .then((response) => {
        utils.writeJson(res, response);
      })
      .catch((response) => {
        utils.writeJson(res, response);
      });
  },

  updateSectionTime(req, res) {
    const { cid } = req.query;

    Score.get_summary_score(cid)
      .then((response) => {
        utils.writeJson(res, response);
      })
      .catch((response) => {
        utils.writeJson(res, response);
      });
  },

  deleteSectionTime(req, res) {
    const {
      setcid,
      ecid,
      cid,
    } = req.params;
    res.status(200).json({ massage: `delete section time od id : ${setcid} of exam id ${ecid} of channel ${cid}` });
  },

};
