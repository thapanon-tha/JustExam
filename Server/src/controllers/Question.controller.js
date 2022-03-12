const db = require('../models/db');
const Question = require('../services/queation.service');
const Answer = require('../services/answer.service');

const stdCode = require('./stdCode');

module.exports = {
  async getQuestion(req, res) {
    const { eid } = req.params;
    const uid = 'a7baa518-29cd-4ff1-ae2c-42ddeeb31940' || req.user.uid;
    try {
      const questions = await Question.getQuestion(eid, uid);
      const datas = await questions.map((data) => {
        let finalData = {};
        finalData = {
          qid: data.qid,
          questionTopic: data.questionTopic,
          sectionName: data.sectionName,
          createdAt: data.createdAt,
          updatedAt: data.updatedAt,
          qtid: data.qtid,
          eid: data.eid,
        };
        if (data.questionAnswerCs.length !== 0) { finalData.answer = data.questionAnswerCs; }
        if (data.questionAnswerMCs.length !== 0) { finalData.answer = data.questionAnswerMCs; }
        if (data.questionAnswerSAs.length !== 0) { finalData.answer = data.questionAnswerSAs; }
        if (data.questionAnswerTFs.length !== 0) { finalData.answer = data.questionAnswerTFs; }
        if (data.questionAnswerMs.length !== 0) { finalData.answer = data.questionAnswerMs; }
        return finalData;
      });
      stdCode.querySuccess(datas, res);
    } catch (e) {
      stdCode.Unexpected(e, res);
    }
  },

  async addQuestion(req, res) {
    const { eid } = req.params;
    const uid = 'a7baa518-29cd-4ff1-ae2c-42ddeeb31940' || req.user.uid;
    let transaction;
    console.log(req.body.data);
    const questions = req.body.data;
    try {
      transaction = await db.sequelize.transaction();
      const result = await Promise.all(questions.map((question) => Question.addQuestion(eid, question.questionTopic, question.sectionName, question.qtid, transaction)
        .then(async (resultCreated) => {
          const answers = await Answer.createMany(question.questionAnswer, resultCreated.qid, resultCreated.qtid, transaction);
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
    const { eid, qid } = req.params;
    const uid = 'a7baa518-29cd-4ff1-ae2c-42ddeeb31940' || req.user.uid;
    const {
      questionTopic, sectionName, qtid, questionAnswer,
    } = req.body.data;
    let transaction;
    try {
      transaction = await db.sequelize.transaction();
      await Answer.deleteAnswerByQid(qid, transaction);
      const resultUpdate = await Question.updateQuestion(eid, qid, questionTopic, sectionName, qtid, transaction);
      await Answer.createMany(questionAnswer, qid, qtid, transaction);
      if (resultUpdate[0]) {
        await transaction.commit();
        const data = await Question.getQuestionById(qid, eid, uid).then((responses) => responses.map((response) => {
          let finalData = {};
          finalData = {
            qid: response.dataValues.qid,
            questionTopic: response.dataValues.questionTopic,
            sectionName: response.dataValues.sectionName,
            createdAt: response.dataValues.createdAt,
            updatedAt: response.dataValues.updatedAt,
            qtid: response.dataValues.qtid,
            eid: response.dataValues.eid,
          };
          if (response.dataValues.questionAnswerCs.length !== 0) { finalData.questionAnswer = response.dataValues.questionAnswerCs; }
          if (response.dataValues.questionAnswerMCs.length !== 0) { finalData.questionAnswer = response.dataValues.questionAnswerMCs; }
          if (response.dataValues.questionAnswerSAs.length !== 0) { finalData.questionAnswer = response.dataValues.questionAnswerSAs; }
          if (response.dataValues.questionAnswerTFs.length !== 0) { finalData.questionAnswer = response.dataValues.questionAnswerTFs; }
          if (response.dataValues.questionAnswerMs.length !== 0) { finalData.questionAnswer = response.dataValues.questionAnswerMs; }

          return finalData;
        }));
        stdCode.querySuccess(data[0], res);
      } else {
        throw Error('Can\'t Update Something Wrong');
      }
    } catch (e) {
      if (transaction) { await transaction.rollback(); }
      stdCode.Unexpected(e, res);
    }
  },

  async deleteQuestion(req, res) {
    const { eid, qid } = req.params;
    const uid = 'a7baa518-29cd-4ff1-ae2c-42ddeeb31940' || req.user.uid;
    let transaction;
    try {
      transaction = await db.sequelize.transaction();
      const response = await Question.deleteQuestion(eid, qid, uid, transaction);
      if (response) {
        await transaction.commit();
        stdCode.Success(res);
      } else {
        stdCode.NotFound({ message: `qid : ${qid} Not Found` }, res);
      }
    } catch (e) {
      if (transaction) await transaction.rollback();
      stdCode.Unexpected(e, res);
    }
  },

};
