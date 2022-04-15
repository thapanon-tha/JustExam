const { channel } = require('../models/db');
const db = require('../models/db');

const { answerQuestionScore } = db;

const medthods = {
  async createMany(array, transaction) {
    return Promise.all(
      array.map((data) => medthods.createAnswer(
        data.mid,
        data.ecid,
        data.qecid,
        data.pointReviceve,
        data.answer,
        transaction,
      )),
    );
  },

  async createAnswer(mid, ecid, qecid, pointReviceve, answer, transaction) {
    return answerQuestionScore.create(
      {
        mid,
        ecid,
        qecid,
        pointReviceve,
        answer,
      },
      { transaction },
    );
  },

  async updateMany(datas, transaction) {
    return Promise.all(
      datas.map((e) => medthods.updateOne(e.aqsid, e.pointReviceve, transaction)),
    );
  },

  async updateOne(aqsid, pointReviceve, transaction) {
    return answerQuestionScore.update(
      {
        pointReviceve,
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
