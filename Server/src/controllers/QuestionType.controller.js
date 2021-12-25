const utils = require('sequelize');
const Question = require('../services/queation.service');

module.exports = {

  getQuestionType(req, res) {
    const { eid } = req.params;
    Question.get_exam_question(eid)
      .then((response) => {
        utils.writeJson(res, response);
      })
      .catch((response) => {
        utils.writeJson(res, response);
      });
  },

  addQuestionType(req, res) {
    const { body } = req;
    Question.create_exam_question(body)
      .then((response) => {
        utils.writeJson(res, response);
      })
      .catch((response) => {
        utils.writeJson(res, response);
      });
  },

  updateQuestionType(req, res) {
    const { qtid } = req.params;
    const { body } = req;
    Question.update_exam_queation(qtid, body)
      .then((response) => {
        utils.writeJson(res, response);
      })
      .catch((response) => {
        utils.writeJson(res, response);
      });
  },

  deleteQuestionType(req, res) {
    const { qtid } = req.params;
    Question.delete_exam_question(qtid)
      .then((response) => {
        utils.writeJson(res, response);
      })
      .catch((response) => {
        utils.writeJson(res, response);
      });
  },
};
