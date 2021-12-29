const db = require('../models/db');
const Question = require('../services/queationExamChannel.service');
const Answer = require('../services/answerQuestionChannel.service');
const stdCode = require('./stdCode');

module.exports = {

  async getQuestion(req, res) {
    const { ecid } = req.params;
    const uid = 'a7baa518-29cd-4ff1-ae2c-42ddeeb31940' || req.user.uid;
    try {
      const questions = await Question.getQuestion(ecid);
      const datas = await questions.map((data) => {
        let finalData = {};
        finalData = {
          ...data.dataValues,
        };
        if (data.questionAnswerCChannels.length !== 0) { finalData.answer = [...data.questionAnswerCChannels]; }
        if (data.questionAnswerMCChannels.length !== 0) { finalData.answer = [...data.questionAnswerMCChannels]; }
        if (data.questionAnswerSAChannels.length !== 0) { finalData.answer = [...data.questionAnswerSAChannels]; }
        if (data.questionAnswerTFChannels.length !== 0) { finalData.answer = [...data.questionAnswerTFChannels]; }
        if (data.questionAnswerMChannels.length !== 0) { finalData.answer = [...data.questionAnswerMChannels]; }
        delete finalData.questionAnswerCChannels;
        delete finalData.questionAnswerMCChannels;
        delete finalData.questionAnswerSAChannels;
        delete finalData.questionAnswerTFChannels;
        delete finalData.questionAnswerMChannels;
        return finalData;
      });
      stdCode.querySuccess(datas, res);
    } catch (e) {
      stdCode.Unexpected(e, res);
    }
  },

  async addQuestion(req, res) {
    const { ecid } = req.params;
    const uid = 'a7baa518-29cd-4ff1-ae2c-42ddeeb31940' || req.user.uid;
    let transaction;
    const questions = req.body.data;
    try {
      transaction = await db.sequelize.transaction();
      const result = await Promise.all(questions.map((question) => Question.addQuestion(ecid, question.questionTopic, question.sectionName, question.point, question.qtid, transaction)
        .then(async (resultCreated) => {
          const answers = await Answer.createMany(question.questionAnswer, resultCreated.qecid, resultCreated.qtid, transaction);
          const final = { ...resultCreated.dataValues, questionAnswer: answers };
          return final;
        })));
      await transaction.commit();
      stdCode.Created(result, res);
    } catch (e) {
      if (transaction) await transaction.rollback();
      stdCode.Unexpected(e, res);
    }
  },

  async updateQueation(req, res) {
    const { ecid } = req.params;
    const uid = 'a7baa518-29cd-4ff1-ae2c-42ddeeb31940' || req.user.uid;
    const questions = req.body.data;
    let transaction;
    try {
      transaction = await db.sequelize.transaction();
      const respone = await Promise.all(questions.map(async (question) => {
        await Answer.deleteAnswerByQid(question.qecid, transaction);
        await Question.updateQuestion(question.qecid, question.questionTopic, question.sectionName, question.point, question.qtid, transaction);
        await Answer.createMany(question.questionAnswer, question.qecid, question.qtid, transaction);
      }));
      await transaction.commit();
      const newQuestions = await Question.getQuestion(ecid);
      const datas = await Promise.all(newQuestions.map((data) => {
        let finalData = {};
        finalData = {
          ...data.dataValues,
        };
        if (data.questionAnswerCChannels.length !== 0) { finalData.answer = [...data.questionAnswerCChannels]; }
        if (data.questionAnswerMCChannels.length !== 0) { finalData.answer = [...data.questionAnswerMCChannels]; }
        if (data.questionAnswerSAChannels.length !== 0) { finalData.answer = [...data.questionAnswerSAChannels]; }
        if (data.questionAnswerTFChannels.length !== 0) { finalData.answer = [...data.questionAnswerTFChannels]; }
        if (data.questionAnswerMChannels.length !== 0) { finalData.answer = [...data.questionAnswerMChannels]; }
        delete finalData.questionAnswerCChannels;
        delete finalData.questionAnswerMCChannels;
        delete finalData.questionAnswerSAChannels;
        delete finalData.questionAnswerTFChannels;
        delete finalData.questionAnswerMChannels;
        return finalData;
      }));
      stdCode.querySuccess(datas, res);
    } catch (e) {
      if (transaction) { await transaction.rollback(); }
      stdCode.Unexpected(e, res);
    }
  },
};
