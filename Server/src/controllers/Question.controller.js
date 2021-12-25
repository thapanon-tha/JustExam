const utils = require('sequelize');
const Question = require('../services/queation.service');

module.exports = {
  create_exam_question(req, res, next, body, eid) {
    Question.create_exam_question(body, eid)
      .then((response) => {
        utils.writeJson(res, response);
      })
      .catch((response) => {
        utils.writeJson(res, response);
      });
  },

  delete_exam_question(req, res, next, eid, qid) {
    Question.delete_exam_question(eid, qid)
      .then((response) => {
        utils.writeJson(res, response);
      })
      .catch((response) => {
        utils.writeJson(res, response);
      });
  },

  get_exam_question(req, res, next, eid) {
    Question.get_exam_question(eid)
      .then((response) => {
        utils.writeJson(res, response);
      })
      .catch((response) => {
        utils.writeJson(res, response);
      });
  },

  update_exam_queation(req, res, next, body, qid, eid) {
    Question.update_exam_queation(body, qid, eid)
      .then((response) => {
        utils.writeJson(res, response);
      })
      .catch((response) => {
        utils.writeJson(res, response);
      });
  },
};
