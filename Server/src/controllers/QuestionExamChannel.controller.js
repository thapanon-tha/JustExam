const utils = require('sequelize');
const Question = require('../services/queation.service');

module.exports = {

  getQuestion(req, res) {
    res.sendStatus(200);
  },

  addQuestion(req, res) {
    const { body } = req;
    const { eid } = req.params;
    Question.create_exam_question(body, eid)
      .then((response) => {
        utils.writeJson(res, response);
      })
      .catch((response) => {
        utils.writeJson(res, response);
      });
  },

  updateQueation(req, res) {
    const { eid } = req.params;
    const { qid } = req.query;
    const { body } = req;
    Question.update_exam_queation(body, qid, eid)
      .then((response) => {
        utils.writeJson(res, response);
      })
      .catch((response) => {
        utils.writeJson(res, response);
      });
  },
};
