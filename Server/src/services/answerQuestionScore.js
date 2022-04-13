const { channel } = require('../models/db');
const db = require('../models/db');

const {
  answerQuestionScore,
  questionExamChannel,
  questionAnswerCChannel,
  questionAnswerMCChannel,
  questionAnswerMChannel,
  questionAnswerSAChannel,
  questionAnswerTFChannel,
  sectionExamTimeChannel,
} = db;

const medthods = {
  async createMany(array, transaction) {
    return Promise.all(
      array.map((data) => medthods.createAnswer(
        data.mid,
        data.ecid,
        data.qecid,
        data.pointReceive,
        data.answer,
        transaction,
      )),
    );
  },

  async createAnswer(mid, ecid, qecid, pointReceive, answer, transaction) {
    return answerQuestionScore.create(
      {
        mid,
        ecid,
        qecid,
        pointReceive,
        answer,
      },
      { transaction },
    );
  },

  async updateOne(aqsid, pointReceive, transaction) {
    return answerQuestionScore.update(
      {
        pointReceive,
      },
      {
        where: { aqsid },
      },
      { transaction },
    );
  },
};

module.exports = {
  ...medthods,
};
