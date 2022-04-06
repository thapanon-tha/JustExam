const { Op } = require('sequelize');
const db = require('../models/db');

const Question = db.question;
const { exam } = db;
const { questionAnswerC } = db;
const { questionAnswerMC } = db;
const { questionAnswerSA } = db;
const { questionAnswerTF } = db;
const { questionAnswerM } = db;

const medthods = {
  async getQuestion(eid, uid) {
    return Question.findAll({
      include: [
        {
          model: exam, attributes: [], where: { eid, [Op.or]: [{ uid }, { shareQ: 1 }] }, required: true,
        },
        //* answer Quser
        {
          model: questionAnswerC, required: false,
        },
        {
          model: questionAnswerMC, required: false,
        },
        {
          model: questionAnswerSA, required: false,
        },
        {
          model: questionAnswerTF, required: false,
        },
        {
          model: questionAnswerM, required: false,
        },

      ],
    });
  },

  async getQuestionById(qid, eid, uid) {
    return Question.findAll({
      include: [
        {
          model: exam, attributes: [], where: { eid, [Op.or]: [{ uid }, { shareQ: 1 }] }, required: true,
        },
        //* answer Quser
        {
          model: questionAnswerC, required: false,
        },
        {
          model: questionAnswerMC, required: false,
        },
        {
          model: questionAnswerSA, required: false,
        },
        {
          model: questionAnswerTF, required: false,
        },
        {
          model: questionAnswerM, required: false,
        },

      ],
      where: { qid },
    });
  },

  async addQuestion(eid, questionTopic, sectionName, qtid, transaction) {
    return Question.create({
      questionTopic,
      sectionName,
      qtid,
      eid,
    }, { transaction });
  },

  async updateQuestion(eid, qid, questionTopic, sectionName, qtid, transaction) {
    return Question.update({
      questionTopic,
      sectionName,
      qtid,
    }, {
      where: { qid },
      include: {
        model: exam,
        where: { eid },
      },
    }, { transaction });
  },

  async deleteQuestion(eid, qid, uid, transaction) {
    return Question.destroy({
      where: { eid, qid },
      include: {
        model: exam,
        where: { uid },
      },
    }, { transaction });
  },

  async deleteQuestions(eid, uid, transaction) {
    return Question.destroy({
      where: { eid },
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
