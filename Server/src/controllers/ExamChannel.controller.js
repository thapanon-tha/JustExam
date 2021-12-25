const utils = require('sequelize');
const Exam = require('../services/exam.service');

module.exports = {

  getAllExamChannel(req, res) {
    const { body } = req;
    Exam.create_new_exam(body)
      .then((response) => {
        utils.writeJson(res, response);
      })
      .catch((response) => {
        utils.writeJson(res, response);
      });
  },

  addExamChannel(req, res) {
    Exam.get_all_exam()
      .then((response) => {
        utils.writeJson(res, response);
      })
      .catch((response) => {
        utils.writeJson(res, response);
      });
  },

  getExamChannel(req, res) {
    const { eid } = req.params;
    Exam.get_exam(eid)
      .then((response) => {
        utils.writeJson(res, response);
      })
      .catch((response) => {
        utils.writeJson(res, response);
      });
  },

  updateExamChannel(req, res) {
    const { eid } = req.params;
    const { body } = req;
    Exam.update_exam(body, eid)
      .then((response) => {
        utils.writeJson(res, response);
      })
      .catch((response) => {
        utils.writeJson(res, response);
      });
  },

  deleteExamChannel(req, res) {
    const { eid } = req.params;
    Exam.delete_exam(eid)
      .then((response) => {
        utils.writeJson(res, response);
      })
      .catch((response) => {
        utils.writeJson(res, response);
      });
  },

  totalPointChannel(req, res) {
    const { eid } = req.params;
    Exam.delete_exam(eid)
      .then((response) => {
        utils.writeJson(res, response);
      })
      .catch((response) => {
        utils.writeJson(res, response);
      });
  },

};
