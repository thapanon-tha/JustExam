const { Op } = require('sequelize');
const db = require('../models/db');

const { questionExamChannel } = db;
const { exam } = db;
const { questionAnswerCChannel } = db;
const { questionAnswerMCChannel } = db;
const { questionAnswerSAChannel } = db;
const { questionAnswerTFChannel } = db;
const { questionAnswerMChannel } = db;

const medthods = {
  async getQuestion(ecid) {
    return questionExamChannel.findAll({
      include: [
        //* answer Quser
        {
          model: questionAnswerCChannel, required: false,
        },
        {
          model: questionAnswerMCChannel, required: false,
        },
        {
          model: questionAnswerSAChannel, required: false,
        },
        {
          model: questionAnswerTFChannel, required: false,
        },
        {
          model: questionAnswerMChannel, required: false,
        },

      ],
      where: { ecid },
    });
  },

  async getQuestionById(qecid, ecid) {
    return questionExamChannel.findAll({
      include: [
        //* answer Quser
        {
          model: questionAnswerCChannel, required: false,
        },
        {
          model: questionAnswerMCChannel, required: false,
        },
        {
          model: questionAnswerSAChannel, required: false,
        },
        {
          model: questionAnswerTFChannel, required: false,
        },
        {
          model: questionAnswerMChannel, required: false,
        },

      ],
      where: { qecid, ecid },
    });
  },

  async addQuestion(ecid, questionTopic, sectionName, point, qtid, transaction) {
    return questionExamChannel.create({
      questionTopic,
      sectionName,
      qtid,
      point,
      ecid,
    }, { transaction });
  },

  async updateQuestion(qecid, questionTopic, sectionName, point, qtid, transaction) {
    return questionExamChannel.update({
      questionTopic,
      sectionName,
      point,
      qtid,
    }, {
      where: { qecid },
    }, { transaction });
  },

  async deleteQuestion(ecid, qecid, uid, transaction) {
    return questionExamChannel.destroy({
      where: { ecid, qecid },
      include: {
        model: exam,
        where: { uid },
      },
    }, { transaction });
  },
};

module.exports = {
  ...medthods,
};
